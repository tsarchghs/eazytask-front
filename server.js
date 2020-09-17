const express = require('express');
const path = require('path');
const app = express();

app.use((req, res, next) => {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
})

app.use(express.static(path.join(__dirname, 'build')));


app.get('/dev/ping', function (req, res) {
    return res.send('pong');
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);