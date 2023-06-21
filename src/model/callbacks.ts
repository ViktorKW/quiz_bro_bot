import { MyContext } from "./myContext"
import { settings_reply_message } from "./texts"
import { settings_menu } from "./menus"
import { Keyboard } from "grammy"
import { start_quiz_text } from "./texts"

export async function settingsCallback(ctx:MyContext) {
    await ctx.reply(settings_reply_message, { reply_markup: settings_menu })

    const keyboard = new Keyboard().persistent().oneTime()
        .text(start_quiz_text)

    await ctx.reply("Press the button when you're ready!", { reply_markup: keyboard })
}