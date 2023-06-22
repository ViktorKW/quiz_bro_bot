import { MyContext } from "./myContext"
import { settings_reply_message, settings_text } from "./texts"
import { settings_menu } from "./menus"
import { Keyboard } from "grammy"
import { start_quiz_text } from "./texts"

export async function settingsCallback(ctx:MyContext) {
    await ctx.reply(settings_reply_message, { reply_markup: settings_menu })

    const keyboard = new Keyboard().persistent().oneTime()
        .text(start_quiz_text)

    await ctx.reply("Press the button when you're ready!", { reply_markup: keyboard })
}


export async function showStatsCallback(ctx:MyContext) {
    const keyboard = new Keyboard().persistent().oneTime()
        .text(start_quiz_text).text(settings_text)

    const sum = ctx.session.categories.reduce(
        (accumulator, category) => {
            accumulator.total_questions += category.total_questions
            accumulator.correct_answers_number += category.correct_answers_number
            accumulator.incorrect_answers_number += category.incorrect_answers_number
            return accumulator
        },
        {
            total_questions: 0,
            correct_answers_number: 0,
            incorrect_answers_number: 0,
        }
    )

    const stats = `
Your stats!
Total questions answered: ${sum.correct_answers_number+sum.incorrect_answers_number}/${sum.total_questions}
Total correct answers: ${sum.correct_answers_number}
Total incorrect answers: ${sum.incorrect_answers_number}
    `

    await ctx.reply(stats, { reply_markup: keyboard })
}