export type Category = {
    id:number,
    name:string
}

export type CategoryOption = {
    id: number,
    name: string,
    checked: boolean,
    total_questions: number,
    correct_answers_number: number,
    incorrect_answers_number: number
}

export interface IUser{
    categories: CategoryOption[],
    token: string
}