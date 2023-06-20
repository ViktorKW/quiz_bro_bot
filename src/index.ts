import { Bot, Context, InlineKeyboard, Keyboard, session } from "grammy"
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
import { Menu } from "@grammyjs/menu"
import retrieveCategories from "./api/retrieveCategories"

async function main() {
    const bot = new Bot<MyContext>(BOT_TOKEN)
    const settings_menu = createSettingsMenu()
    const settings_reply_message = `Category Settings 🛠
    
✅ Categories: These categories will be included in your quiz queue.
❌ Categories: These categories will not appear in your quiz.
If no categories are selected, you will receive random questions from all available categories.

You can customize your quiz experience by selecting the categories that interest you.`

    const navigation_menu = createNavigationMenu(settings_menu, settings_reply_message)

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

    bot.command("start", async (ctx)=>{
        await initializeBot(ctx)

        await ctx.reply("Welcome to @quiz_bro_bot! This bot is designed to provide an engaging quiz experience. It retrieves random questions from the OpenTriviaDatabase, offering a variety of categories for you to choose from. Get ready to test your knowledge and have fun!\n\nFor more information about the OpenTriviaDatabase, visit their website at: https://opentdb.com.", {
            reply_markup: navigation_menu
        })
    })

    bot.command("quiz", async (ctx)=>{
        await ctx.conversation.enter("quizConversation")
    })

    bot.command("settings", async(ctx)=>{
        await ctx.reply(settings_reply_message, { reply_markup: settings_menu })
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

function createSettingsMenu():Menu<MyContext>{
    const menu = new Menu<MyContext>("categories_settings")
    
    menu.dynamic((ctx, range)=>{
        const valid_categories = ctx.session.categories.filter((item)=>{
            return item.name !== "General Knowledge"
        })

        for(const category of valid_categories){
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

function createNavigationMenu(settings_menu:Menu<MyContext>, settings_reply_message:string):Menu<MyContext>{
    const menu = new Menu<MyContext>("navigation")
        .text("Start quizzing through 🏄‍♂️", async (ctx)=>{
            await ctx.conversation.enter("quizConversation")
        })
        .text("Category Settings 🛠", async (ctx)=>{
            await ctx.reply(settings_reply_message, { reply_markup: settings_menu })
        })

    return menu
}

main()