
function isDataURL(s) {
    return !!s.match(isDataURL.regex);
}
isDataURL.regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;

export default (key,type) => {
    if (!key) return undefined;
    if (isDataURL(key)) return key
    return `${window.__AWS_BASE_URL__}/${type ? type + "-" : ""}${key}`
}