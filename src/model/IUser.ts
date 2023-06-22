export type Category = {
    id:number,
    name:string
}

export type CategoryOption = {
    id: number,
    name: string,
    checked: boolean,
    total_questions: number,
}

export interface IUser{
    categories: CategoryOption[],
    token: string
}