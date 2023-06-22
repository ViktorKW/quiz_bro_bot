import axios from "axios"

export type CategoryQuestionCount = {
    total_num_of_questions:number,
    total_num_of_pending_questions:number,
    total_num_of_verified_questions:number,
    total_num_of_rejected_questions:number
}

export type GlobalCategoryQuestionCount = {
    [key: string]: CategoryQuestionCount
}

export async function getGlobalQuestionCount():Promise<GlobalCategoryQuestionCount> {
    const URL = "https://opentdb.com/api_count_global.php"
    
    try{
        const resp = await axios.get(URL)
        const data = resp.data
        
        if(data?.categories){
            console.log(data?.categories)
            return data?.categories
        } else{
            throw "getGlobalQuestionCount failed to fetch data"
        }
    } catch(err){
        console.log(err)
        return Promise.reject()
    }
}

export function getCategoryQuestionCountById(global_question_count:GlobalCategoryQuestionCount, category_id:number):CategoryQuestionCount{
    for (const key in global_question_count) {
        if(Number(key) === category_id){
            return global_question_count[key]
        }
    }

    return {
        total_num_of_questions:0,
        total_num_of_pending_questions:0,
        total_num_of_verified_questions:0,
        total_num_of_rejected_questions:0
    }
}