import { Bot, session } from "grammy"
import { BOT_TOKEN } from "./config"
import {
    conversations,
    createConversation,
} from "@grammyjs/conversations"
import { MyContext } from "./model/myContext"


async function main() {
    const bot = new Bot<MyContext>(BOT_TOKEN)

    bot.use(conversations())

    bot.command("start", async (ctx)=>{
        ctx.reply("First launch")
    })

    bot.catch(err=>console.error(err))
  
    console.log("Starting new bot instance")
    bot.start()
}

main()