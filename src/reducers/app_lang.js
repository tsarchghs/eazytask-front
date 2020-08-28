import LandingPage from "./page_lang/landing-page.json"
import Dashboard from "./page_lang/dashboard.json"
import Setup from "./page_lang/setup.json"
import CreateTask from "./page_lang/create-task.json"
import MyProfileEdit from "./page_lang/my_profile_edit.json"
import Common from "./page_lang/common.json";
import Settings from "./page_lang/settings.json"
import DeleteAccountThank from "./page_lang/delete_account_thank.json"
import LoginRegister from "./page_lang/login-register.json";
import History from "./page_lang/history.json";
import TaskProfile from "./page_lang/task-profile.json";
import NotificationsMobile from "./page_lang/notifications-mobile.json";
import TaskChat from "./page_lang/task-chat.json";
import TaskEdit from "./page_lang/task-edit.json";
import Blog from "./page_lang/blog.json";
import Footer from "./page_lang/footer.json";
import ActiveListing from "./page_lang/active-listing.json";
import OfferProfile from "./page_lang/offer-profile.json";
import Faq from "./page_lang/faq.json";
import ForgetPassword from "./page_lang/forget-password.json";
import Profile from "./page_lang/profile.json";
import ChangePhoneNumber from "./page_lang/change-phone-number.json";

let languages = ["en", "de"];

const INITIAL_STATE = {
    languages,
    app_lang: localStorage.getItem("app_lang") || "de",
    common: Common,
    data: {
        "/home": LandingPage,
        "/dashboard": Dashboard,
        "/setup": Setup,
        "/create-task": CreateTask,
        "/my_profile_edit": MyProfileEdit,
        "/settings": Settings,
        "/delete_account_thank": DeleteAccountThank,
        "/login-register": LoginRegister,
        "/history": History,
        "/task-profile": TaskProfile,
        "/notifications-mobile": NotificationsMobile,
        "/task-chat": TaskChat,
        "/task-edit": TaskEdit,
        "/blog": Blog,
        "/footer": Footer,
        "/active-listing": ActiveListing,
        "/offer-profile": OfferProfile,
        "/faq": Faq,
        "/forget-password": ForgetPassword,
        "/profile": Profile,
        "/change-phone-number": ChangePhoneNumber
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default: return state
    }
}