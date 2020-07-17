import LandingPage from "./page_lang/landing-page.json"
import Dashboard from "./page_lang/dashboard.json"
import Setup from "./page_lang/setup.json"
import CreateTask from "./page_lang/create-task.json"

let languages = ["en", "de"];

const INITIAL_STATE = {
    languages,
    app_lang: localStorage.getItem("app_lang") || "en",
    common: {
        "loading": {
            "en": "Loading...",
            "de": "Noneing.."
        },
    },
    data: {
        "/": LandingPage,
        "/dashboard": Dashboard,
        "/setup": Setup,
        "/create-task": CreateTask
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default: return state
    }
}