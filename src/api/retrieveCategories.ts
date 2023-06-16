import axios from "axios"
import { Category } from "../model/IUser"

export default async function retrieveCategories():Promise<Category[]>{
    const URL = "https://opentdb.com/api_category.php"

    try{
        const resp = await axios.get(URL)
        const data = resp.data

        if(data?.trivia_categories){
            console.log(data?.trivia_categories)
            return data?.trivia_categories
        } else{
            throw "retrieveCategories failed to retrieve categories"
        }
    } catch(err){
        console.log(err)
        return []
    }
}
