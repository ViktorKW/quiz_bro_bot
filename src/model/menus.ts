import { Menu } from "@grammyjs/menu"
import { MyContext } from "./myContext"

export const settings_menu = createSettingsMenu()

function createSettingsMenu():Menu<MyContext>{
    const menu = new Menu<MyContext>("categories_settings")
    
    menu.dynamic((ctx, range)=>{
        for(const category of ctx.session.categories){
            range
                .text(`${category.name} (${category.total_questions}) ${category.checked ? "✅" : "❌"}`, (ctx)=>{
                    category.checked = !category.checked
                    ctx.menu.update()
                })
                .row()
        }
    })

    return menu
}