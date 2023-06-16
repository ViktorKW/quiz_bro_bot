export type Category = {
    id:number,
    name:string
}

export type CategoryOption = {
    checked: boolean,
    id: number,
    name: string
}

export interface IUser{
    categories: CategoryOption[],
    token: string
}