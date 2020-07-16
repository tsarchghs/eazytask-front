
let languages = ["en", "de"];

const INITIAL_STATE = {
    languages,
    app_lang: localStorage.getItem("app_lang") || "de",
    common: {
        "loading": {
            "en": "Loading...",
            "de": "Noneing.."
        },
    },
    data: {
        "/": {

        },
        "/dashboard": {
            "web": {
                "text_1": {
                    "en": "Howdy",
                    "de": "None"
                },
                "text_2": {
                    "en": "View",
                    "de": "None"
                },
                "text_3": {
                    "en": "new offers",
                    "de": "None"
                },
                "text_4": {
                    "en": "My tasks",
                    "de": "None"
                },
                "text_5": {
                    "en": "It's lonely here",
                    "de": "None"
                },
                "text_6": {
                    "en": "You don't have any active tasks yet",
                    "de": "None"
                },
                "text_7": {
                    "en": "Active tasks",
                    "de": "None",
                },
                "text_8": {
                    "en": "Discover active listings",
                    "de": "None"
                },
                "text_9": {
                    "en": "View all",
                    "de": "None"
                },
                "text_10": {
                    "en": "Read our Blog",
                    "de": "None"
                },
                "text_12": {
                    "en": "Explore more",
                    "de": "None"
                },
                "text_13": {
                    "en": "History",
                    "de": "None"
                },
                "text_14": {
                    "en": "View history of",
                    "de": "None"
                },
                "text_15": {
                    "en": "your activity",
                    "de": "None"
                },
                "text_16": {
                    "en": "Landing",
                    "de": "None"
                },
                "text_17": {
                    "en": "View",
                    "de": "None"
                },
                "text_18": {
                    "en": "landing page",
                    "de": "None"
                },
                "text_19": {
                    "en": "Faq",
                    "de": "None"
                },
                "text_20": {
                    "en": "Discover",
                    "de": "None"
                },
                "text_21": {
                    "en": "Frequently asked",
                    "de": "None"
                },
                "text_22": {
                    "en": "Questions",
                    "de": "None"
                },
                "text_23": {
                    "en": "some active listings on eazytask",
                    "de": "None"
                },
                "text_24": {
                    "en": "Get inspired by reading our latest articles on our blog",
                    "de": "None"
                },
                "text_25": {
                    "en": "No offers to show",
                    "de": "Nein offerd to sein"
                },
                "text_26": {
                    "en": "Offer",
                    "de": "None"
                },
                "text_27": {
                    "en": "No tasks to show...",
                    "de": "Nein tasks to sein"
                }
            },
            "mobile": {
                "text_1": {
                    "en": "Howdy",
                    "de": "None"
                },
                "text_2": {
                    "en": "View",
                    "de": "None"
                },
                "text_3": {
                    "en": "My tasks",
                    "de": "None"
                },
                "text_4": {
                    "en": "Discover",
                    "de": "None"
                },
                "text_5": {
                    "en": "Offers",
                    "de": "None"
                },
                "text_6": {
                    "en": "More",
                    "de": "None"
                },
                "text_7": {
                    "en": "It's lonely here",
                    "de": "None"
                },
                "text_8": {
                    "en": "You don't have any active task yet.",
                    "de": "None"
                },
                "text_9": {
                    "en": "No offers to show...",
                    "de": "Nein offers to show"
                },
                "text_10": {
                    "en": "Blog",
                    "de": "None"
                },
                "text_11": {
                    "en": "Read our ",
                    "de": "None"
                },
                "text_12": {
                    "en": "latest blog",
                    "de": "None"
                },
                "text_13": {
                    "en": "History",
                    "de": "None"
                },
                "text_14": {
                    "en": "View history of",
                    "de": "None"
                },
                "text_15": {
                    "en": "your activity",
                    "de": "None"
                },
                "text_16": {
                    "en": "Landing",
                    "de": "None"
                },
                "text_17": {
                    "en": "View",
                    "de": "None"
                },
                "text_18": {
                    "en": "landing page",
                    "de": "None"
                },
                "text_19": {
                    "en": "Faq",
                    "de": "Defaq"
                },
                "text_20": {
                    "en": "Discover",
                    "de": "None"
                },
                "text_21": {
                    "en": "Frequently asked",
                    "de": "None"
                },
                "text_22": {
                    "en": "Questions",
                    "de": "None"
                },
                "text_23": {
                    "en": "new offers",
                    "de": "None"
                },
            }
        },
        "/setup": {
            "text_1": {
                "en": "Account setup",
                "de": "None"
            },
            "text_2": {
                "en": "Welcome",
                "de": "None"
            },
            "text_3": {
                "en": "Do you want to",
                "de": "None"
            },
            "text_4": {
                "en": "setup your account now?",
                "de": "None"
            },
            "text_5": {
                "en": "Profile",
                "de": "None"
            },
            "text_5_1": {
                "en": "Profile cover",
                "de": "None"
            },
            "text_6": {
                "en": "Add your profile picture",
                "de": "None"
            },
            "text_7": {
                "en": "Add your cover picture",
                "de": "None"
            },
            "text_8": {
                "en": "Location",
                "de": "None"
            },
            "text_9": {
                "en": "Please add your location",
                "de": "None"
            },
            "text_10": {
                "en": "ZIP",
                "de": "None"
            },
            "text_11": {
                "en": "Town",
                "de": "None"
            },
            "text_12": {
                "en": "Address",
                "de": "None"
            },
            "text_13": {
                "en": "Notifications",
                "de": "None"
            },
            "text_14": {
                "en": "How do you want",
                "de": "None"
            },
            "text_15": {
                "en": "to be notified?",
                "de": "None"
            },
            "text_16": {
                "en": "Mail",
                "de": "None"
            },
            "text_17": {
                "en": "SMS",
                "de": "None"
            },
            "text_18": {
                "en": "Phone number",
                "de": "None"
            },
            "text_19": {
                "en": "Type your phone number",
                "de": "None"
            },
            "text_20": {
                "en": "Verification code",
                "de": "None"
            },
            "text_21": {
                "en": "Type your verification code",
                "de": "None"
            },
            "text_22": {
                "en": "Invalid code",
                "de": "None"
            },
            "text_23": {
                "en": "Almost there",
                "de": "None"
            },
            "text_24": {
                "en": "Do you want to",
                "de": "None"
            },
            "text_25": {
                "en": "join also as a tasker?",
                "de": "None"
            },
            "text_26": {
                "en": "My skills",
                "de": "None"
            },
            "text_27": {
                "en": "Search for a skill or add a custom one",
                "de": "None"
            },
            "text_28": {
                "en": "My area of activity",
                "de": "None"
            },
            "text_29": {
                "en": "Search for a city or add a custom one",
                "de": "None"
            },
            "text_30": {
                "en": "My languages",
                "de": "None"
            },
            "text_31": {
                "en": "Search for a language or add a custom one",
                "de": "None"
            },
            "text_32": {
                "en": "Ready to go",
                "de": "None"
            },
            "text_33": {
                "en": [
                    "Lorem ipsum dolor sit amet,",
                    "consetetur sadipscing elitr, sed diam."
                ],
                "de": [
                    "DE: Lorem ipsum dolor sit amet,",
                    "DE: consetetur sadipscing elitr, sed diam."
                ]
            },
            "text_34": {
                "en": "Go",
                "de": "None"
            },
            "text_35": {
                "en": "Next",
                "de": "None"
            },
            "text_36": {
                "en": "Skip for now",
                "de": "None"
            },
            "text_37": {
                "en": "Finish",
                "de": "None"
            },
            "text_38": {
                "en": "Personal apperance",
                "de": "None"
            },
            "text_39": {
                "en": "Last thing",
                "de": "None"
            },
            "text_40": {
                "en": "Setup",
                "de": "None"
            },
            "text_41": {
                "en": "No, thanks.",
                "de": "None"
            }
        }
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default: return state
    }
}