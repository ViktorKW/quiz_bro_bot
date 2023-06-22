import { MyContext } from "./model/myContext"
import { generateNewSessionToken } from "./api/generateNewSessionToken"
import retrieveCategories from "./api/retrieveCategories"
import { getGlobalQuestionCount } from "./api/getGlobalQuestionCount"
import { Category, CategoryOption } from "./model/IUser"
import { getCategoryQuestionCountById } from "./api/getGlobalQuestionCount"

export async function initializeBot(ctx:MyContext) {
    ctx.session.token = await generateNewSessionToken()

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