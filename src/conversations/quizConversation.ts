import { Question, getQuestion } from "../api/getQuestion"
import { CategoryOption } from "../model/IUser"
import { MyConversation, MyContext } from "../model/myContext"
import { Keyboard } from "grammy"
import { next_question_text } from "../model/texts"

export async function quizConversation(conversation: MyConversation, ctx: MyContext){
    const chosen_category = selectRandomCategory(ctx.session.categories)
    const question:Question = await conversation.external(async ()=>await getQuestion(ctx, chosen_category.id)) 

    if(question){
        const question_keyboard = createQuestionKeyboard(ctx, question)

        await ctx.reply(`❓ ${question.question}`, {
            reply_markup: question_keyboard
        })

        const { message } = await conversation.waitForHears([question.correct_answer, ...question.incorrect_answers])

        const is_correct = message?.text?.toLowerCase() === question.correct_answer.toLowerCase()
        const reply_message = is_correct
            ? "✅ You're correct!"
            : `❌ You're wrong! Correct answer is ${question.correct_answer}`


        const keyboard = new Keyboard().persistent().oneTime()
            .text(next_question_text)

        await ctx.reply(reply_message, { 
            reply_markup: keyboard
        })
    } else {
        conversation.log("Question not found")
    }
}   

function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array]
  
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
    }
  
    return shuffledArray
}

function createQuestionKeyboard(ctx:MyContext, question:Question):Keyboard{
    const keyboard = new Keyboard().oneTime().persistent()
    
    if(question.type === "boolean"){
        keyboard.text("True").text("False")

        return keyboard
    } else{
        const question_answers:string[] = [...question.incorrect_answers, question.correct_answer]
        const shuffled_question_answers = shuffleArray(question_answers)
        console.log(shuffled_question_answers)

        for(const question_string of shuffled_question_answers){
            keyboard.text(question_string).row()
        }     

        return keyboard 
    }
}

function selectRandomCategory(categories:CategoryOption[]):CategoryOption{
    const chosen_category_options = categories.filter((item)=>{
        return item.checked === true
    })

    if(chosen_category_options.length > 0){
        const random_index = Math.floor(Math.random()*chosen_category_options.length)
        return chosen_category_options[random_index]
    } else {
        const default_category = {
            "checked": false,
            "id": 9,
            "name": "General Knowledge"
        }
        
        return default_category
    }
}