import { Menu } from "@grammyjs/menu"
import { MyContext } from "./myContext"
import { settings_reply_message } from "./texts"

export const settings_menu = createSettingsMenu()
export const navigation_menu = createNavigationMenu(settings_menu, settings_reply_message)
export const i_am_ready_menu = createReadyMenu()

function createReadyMenu():Menu<MyContext>{
    const menu = new Menu<MyContext>("i_am_ready_menu")
        .text("I am ready", async (ctx)=>{
            await ctx.conversation.enter("quizConversation")
        })
    
    return menu
}

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

function createNavigationMenu(settings_menu:Menu<MyContext>, settings_reply_message:string):Menu<MyContext>{
    const menu = new Menu<MyContext>("navigation")
        .text("Start quizzing through 🏄‍♂️", async (ctx)=>{
            await ctx.conversation.enter("quizConversation")
        })
        .text("Category Settings 🛠", async (ctx)=>{
            await ctx.reply(settings_reply_message, { reply_markup: settings_menu })
        })

    return menu
}