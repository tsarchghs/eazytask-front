
const detectEmails = text => {
    let i = text.match(/[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})/g);
    if (i && i.length) return true;
    return false
}

export default detectEmails;