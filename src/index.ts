import { Bot, session } from "grammy"
import { BOT_TOKEN } from "./config"
import {
    conversations,
    createConversation,
} from "@grammyjs/conversations"
import { MyContext } from "./model/myContext"
import { Category, CategoryOption, IUser } from "./model/IUser"
import { FileAdapter } from "@grammyjs/storage-file"
import { chooseCategoryConversation } from "./conversations/chooseCategoryConversation"
import { generateNewSessionToken } from "./api/generateNewSessionToken"
import { Menu } from "@grammyjs/menu"
import retrieveCategories from "./api/retrieveCategories"

async function main() {
    const bot = new Bot<MyContext>(BOT_TOKEN)
    const menu = createMenu()

    bot.use(
        session({
            initial: () => ({ 
                categories: [],
                token:""
            }),
            storage: new FileAdapter<IUser>({
                dirName: "sessions",
            }),
        })
    )
    
    bot.use(menu)
    bot.use(conversations())
    bot.use(createConversation(chooseCategoryConversation))

    bot.command("start", async (ctx)=>{
        await initializeBot(ctx)
        await ctx.reply("Settings:", { reply_markup: menu })
        // await ctx.conversation.enter("chooseCategoryConversation")
    })

    bot.command("settings", async(ctx)=>{
        await ctx.reply("Settings:", { reply_markup: menu })
    })

    bot.catch(err=>console.error(err))
  
    console.log("Starting new bot instance")
    bot.start()
}

async function initializeBot(ctx:MyContext) {
    if(ctx.session.token === ""){
        ctx.session.token = await generateNewSessionToken()
    }

    if(ctx.session.categories.length === 0){
        const categories:Category[] = await retrieveCategories()
        const category_items:CategoryOption[] = categories.map((item)=>{
            return {
                checked: false,
                ...item
            }
        })

        ctx.session.categories = category_items
    }
}

function createMenu():Menu<MyContext>{
    const menu = new Menu<MyContext>("categories_settings")
    
    menu.dynamic((ctx, range)=>{
        for(const category of ctx.session.categories){
            range
                .text(`${category.name} ${category.checked ? "✅" : "❌"}`, (ctx)=>{
                    category.checked = !category.checked
                    ctx.menu.update()
                })
                .row()
        }
    })

    return menu
}

main()