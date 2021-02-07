//yarn init
//yarn add express

const express = require('express');
const app = express();

app.get('/projects', (require, response) => {
    return response.send('Hello World');
})

app.listen(3333);
