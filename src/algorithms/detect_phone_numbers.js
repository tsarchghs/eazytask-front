
const detectPhoneNumberInside = message => {
    let words = message.replace(/[$&+,:;=?@#|'<>.^*()%!-]/g," ").split(" ")
    for (let x = 0; x < words.length; x++){
        let word = words[x];
        let matched = word.match(/[1234567890]/g)
        if (matched) {
            let all = [ word ]
            for (let i = x + 1; i < words.length; i++){
                let matched = words[i].match(/[1234567890]/g)
                if (matched) all.push(words[i])
            }
            if (all.join("").length > 7 && all.join("").length < 17) {
                return true;
            }
        } 
    }
    return false;
}

export default detectPhoneNumberInside