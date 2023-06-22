import { Bot, Keyboard, session } from "grammy"
import { BOT_TOKEN } from "./config"
import {
    conversations,
    createConversation,
} from "@grammyjs/conversations"
import { MyContext } from "./model/myContext"
import { IUser } from "./model/IUser"
import { FileAdapter } from "@grammyjs/storage-file"
import { quizConversation } from "./conversations/quizConversation"
import { settings_menu } from "./model/menus"
import { start_quiz_text, next_question_text, settings_text, welcome_message } from "./model/texts"
import { settingsCallback } from "./model/callbacks"
import { initializeBot } from "./initializeBot"

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

main()