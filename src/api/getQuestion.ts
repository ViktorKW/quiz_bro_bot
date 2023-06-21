import axios from "axios"
import { MyContext } from "../model/myContext"
import he from "he"
import { manageToken } from "./manageToken"

export type Question = {
    category:string,
    type:"multiple" | "boolean",
    difficulty:"easy" | "medium" | "hard",
    question:string,
    correct_answer:string,
    incorrect_answers:string[]
}

export async function getQuestion(ctx:MyContext, category_id:number):Promise<Question> {
    const URL = `https://opentdb.com/api.php?amount=1&token=${ctx.session.token}&category=${category_id}`
    
    const resp = await axios.get(URL)
    const data = resp.data

    console.log("question data: ", data)

    try{
        if(data?.response_code === 0){
            const first_question_element:Question = decodeQuestion(data?.results[0])
            return first_question_element
        } else if(data?.response_code === 3){
            console.log("Token is too old!")
            const new_token = await manageToken(ctx.session.token)
            ctx.session.token = new_token
            
            return await getQuestion(ctx, category_id)
        } else{
            throw "getQuestion failed to get question"
        }
    } catch(err){
        console.log(err)
        return Promise.reject(err)
    }
}

function decodeQuestion(question:Question):Question{
    question.question = he.decode(question.question)
    question.correct_answer = he.decode(question.correct_answer)
    question.incorrect_answers = question.incorrect_answers.map((str)=>{
        return he.decode(str)
    })

    return question
}