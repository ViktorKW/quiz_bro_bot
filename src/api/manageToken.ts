import { resetSessionToken } from "./resetSessionToken"
import { generateNewSessionToken } from "./generateNewSessionToken"

export async function manageToken(token:string):Promise<string> {
    const max_resets = 2

    for(let i = 0; i < max_resets; i++){
        try{
            const new_token = await resetSessionToken(token)
            return new_token
        } catch(e){
            console.log("Failed to manageToken with resetSessionToken. Number of tries left: ", max_resets - i - 1)
        }
    }

    try{
        const new_token = await generateNewSessionToken()
        return new_token
    } catch(e){
        console.log("Failed to manageToken with generateNewSessionToken")
        return Promise.reject()
    }
}