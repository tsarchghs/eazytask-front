import LandingPage from "./page_lang/landing-page.json"
import Dashboard from "./page_lang/dashboard.json"
import Setup from "./page_lang/setup.json"
import CreateTask from "./page_lang/create-task.json"
import MyProfileEdit from "./page_lang/my_profile_edit.json"
import Common from "./page_lang/common.json";
import Settings from "./page_lang/settings.json"
import DeleteAccountThank from "./page_lang/delete_account_thank.json"

let languages = ["en", "de"];

const INITIAL_STATE = {
    languages,
    app_lang: localStorage.getItem("app_lang") || "en",
    common: Common,
    data: {
        "/": LandingPage,
        "/dashboard": Dashboard,
        "/setup": Setup,
        "/create-task": CreateTask,
        "/my_profile_edit": MyProfileEdit,
        "/settings": Settings,
        "/delete_account_thank": DeleteAccountThank
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default: return state
    }
}