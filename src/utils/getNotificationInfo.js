import store from "../store";

let state = store.getState()
let { 
    OFFER_RECEIVED, 
    OFFER_ACCEPTED, 
    NEW_CHAT_MESSAGE 
} = state.app_lang.common.notifications;
let app_lang = localStorage.getItem("app_lang");

export default {
    "OFFER_RECEIVED": ({ user_1, user_2, task }) => ({
        text: `${OFFER_RECEIVED.text_1[app_lang]} “${task.title}”`,
        pathname: "/task/" + task.id
    }),
    "OFFER_ACCEPTED": ({ user_1, user_2, task }) => ({
        text: `${OFFER_ACCEPTED.text_1[app_lang]} “${task.title}”`,
        pathname: "/task/" + task.id
    }),
    "NEW_CHAT_MESSAGE": ({ user_1, user_2, task }) => {
        let isAnswer = task.UserId === user_2.id;
        let text;
        if (isAnswer) text =  `${NEW_CHAT_MESSAGE.text_1[app_lang]} “${task.title}” QA`
        else text =  `${NEW_CHAT_MESSAGE.text_2[app_lang]} “${task.title}” QA`
        return {
            text,
            pathname: "/task/" + task.id + "/qa"
        }
    },
}
