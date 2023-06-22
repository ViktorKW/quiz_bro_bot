import axios from "axios"
import he from "he"

export type Question = {
    category:string,
    type:"multiple" | "boolean",
    difficulty:"easy" | "medium" | "hard",
    question:string,
    correct_answer:string,
    incorrect_answers:string[]
}

export type ApiGetQuestionResponse = {
    response_code: 0 | 1 | 2 | 3 | 4,
    results: Question[]
}

export async function getQuestion(token:string, category_id:number):Promise<ApiGetQuestionResponse> {
    const URL = `https://opentdb.com/api.php?amount=1&token=${token}&category=${category_id}`
    
    const resp = await axios.get(URL)
    const data = resp.data

    console.log("question data: ", data)

    try{
        if(data){
            return data
        } else{
            throw "getQuestion failed to get question"
        }
    } catch(err){
        console.log(err)
        return Promise.reject(err)
    }
}

export function decodeQuestion(question:Question):Question{
    question.question = he.decode(question.question)
    question.correct_answer = he.decode(question.correct_answer)
    question.incorrect_answers = question.incorrect_answers.map((str)=>{
        return he.decode(str)
    })

    return question
}