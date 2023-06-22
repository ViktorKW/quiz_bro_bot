import { Bot, Keyboard, session } from "grammy"
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
import { settings_menu } from "./model/menus"
import { start_quiz_text, next_question_text, settings_text, welcome_message } from "./model/texts"
import { settingsCallback } from "./model/callbacks"
import { getCategoryQuestionCountById, getGlobalQuestionCount } from "./api/getGlobalQuestionCount"

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

    bot.command("start", async (ctx)=>{
        await initializeBot(ctx)

        const keyboard = new Keyboard().persistent().oneTime()
            .text(start_quiz_text)
            .text(settings_text)

        await ctx.reply(welcome_message, {
            reply_markup: keyboard
        })
    })

    bot.command("quiz", async (ctx)=>{
        await ctx.conversation.enter("quizConversation")
    })

    bot.command("settings", async(ctx)=>{
        await settingsCallback(ctx)
    })

    bot.hears([start_quiz_text, next_question_text, ], async (ctx)=>{
        await ctx.conversation.enter("quizConversation")
    })

    bot.hears([settings_text], async (ctx)=>{
        await settingsCallback(ctx)
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
        const global_question_count = await getGlobalQuestionCount()
        

        const category_items:CategoryOption[] = categories.map((item)=>{
            const { total_num_of_verified_questions } = getCategoryQuestionCountById(global_question_count, item.id)

            return {
                checked: false,
                ...item,
                total_questions: total_num_of_verified_questions,
                correct_answers_number: 0,
                incorrect_answers_number: 0
            }
        })

        ctx.session.categories = category_items
    }
}

main()