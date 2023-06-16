import axios from "axios"

export async function generateNewSessionToken():Promise<string> {
    const URL = "https://opentdb.com/api_token.php?command=request"
    
    try{
        const resp = await axios.get(URL)
        const data = resp.data
        
        if(data?.response_code === 0){
            console.log(data?.response_message)
            return data?.token
        } else{
            throw "generateNewSessionToken failed to generate token"
        }
    } catch(err){
        console.log(err)
        return ""
    }
}