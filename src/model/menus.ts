import { Menu } from "@grammyjs/menu"
import { MyContext } from "./myContext"

export const settings_menu = createSettingsMenu()

function createSettingsMenu():Menu<MyContext>{
    const menu = new Menu<MyContext>("categories_settings")
    
    menu.dynamic((ctx, range)=>{
        const valid_categories = ctx.session.categories.filter((item)=>{
            return item.name !== "General Knowledge"
        })

        for(const category of valid_categories){
            range
                .text(`${category.name} ${category.checked ? "✅" : "❌"}`, (ctx)=>{
                    category.checked = !category.checked
                    ctx.menu.update()
                })
                .row()
        }
    })

    return menu
}