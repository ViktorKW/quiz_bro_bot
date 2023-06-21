import axios from "axios"

export async function resetSessionToken(token:string):Promise<string> {
    const URL = `https://opentdb.com/api_token.php?command=reset&token=${token}`
    
    try{
        const resp = await axios.get(URL)
        const data = resp.data

        if(data?.response_code === 0){
            console.log("Token was reset: ", data?.token)
            return data?.token
        } else{
            throw "resetSessionToken failed to reset token"
        }
    } catch(err){
        console.log(err)
        return Promise.reject()
    }
}