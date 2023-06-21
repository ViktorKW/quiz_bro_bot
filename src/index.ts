import { Bot, session } from "grammy"
import { BOT_TOKEN } from "./config"
import {
    conversations,
    createConversation,
} from "@grammyjs/conversations"
import { MyContext } from "./model/myContext"
import { Category, CategoryOption, IUser } from "./model/IUser"
import { FileAdapter } from "@grammyjs/storage-file"
import { quizConversation } from "./conversations/quizConversation"
import { generateNewSessionToken } from "./api/generateNewSessionToken"
import retrieveCategories from "./api/retrieveCategories"
import { settings_menu, navigation_menu, i_am_ready_menu } from "./model/menus"
import { settings_reply_message, welcome_message } from "./model/texts"

async function main() {
    const bot = new Bot<MyContext>(BOT_TOKEN)
    
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
    
    bot.use(settings_menu)
    bot.use(conversations())
    bot.use(createConversation(quizConversation))
    bot.use(navigation_menu)
    bot.use(i_am_ready_menu)

    bot.command("start", async (ctx)=>{
        await initializeBot(ctx)

        await ctx.reply(welcome_message, {
            reply_markup: navigation_menu
        })
    })

    bot.command("quiz", async (ctx)=>{
        await ctx.conversation.enter("quizConversation")
    })

    bot.command("settings", async(ctx)=>{
        await ctx.reply(settings_reply_message, { reply_markup: settings_menu })
        await ctx.reply("Press here when you're ready", {reply_markup: i_am_ready_menu})
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

main()