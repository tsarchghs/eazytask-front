
module.exports = {
    "OFFER_RECEIVED": ({ user_1, user_2, task }) => ({
        text: `made an offer at “${task.title}”`,
        pathname: "/task/" + task.id
    }),
    "OFFER_ACCEPTED": ({ user_1, user_2, task }) => ({
        text: `accepted your offer for “${task.title}”`,
        pathname: "/task/" + task.id
    }),
    "NEW_CHAT_MESSAGE": ({ user_1, user_2, task }) => {
        let isAnswer = task.UserId === user_2.id;
        let text;
        if (isAnswer) text =  `answered a question in “${task.title}” QA`
        else text =  `asked a question in “${task.title}” QA`
        return {
            text,
            pathname: "/task/" + task.id + "/qa"
        }
    },
}