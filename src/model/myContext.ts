import { Context, SessionFlavor } from "grammy"
import { Conversation, ConversationFlavor } from "@grammyjs/conversations"
import { IUser } from "./IUser"

export type MyContext = Context & SessionFlavor<IUser> & ConversationFlavor
export type MyConversation = Conversation<MyContext>