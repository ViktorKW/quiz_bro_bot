import { Context, SessionFlavor } from "grammy"
import { Conversation, ConversationFlavor } from "@grammyjs/conversations"
import { ICategories } from "./ICategories"

export type MyContext = Context & SessionFlavor<ICategories> & ConversationFlavor
export type MyConversation = Conversation<MyContext>