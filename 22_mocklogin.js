const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(bodyParser.json());

const validCredentials = {
    username: 'admin',
    password: 'password123'
};

// POST login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    if(!username || !password) {
        return res.status(400).json({ status: 'failure', message: 'Username and password required' });
    }
    
    if(username === validCredentials.username && password === validCredentials.password) {
        res.json({ status: 'success' });
    } else {
        res.status(401).json({ status: 'failure' });
    }
});

app.listen(port, () => {
    console.log(`Login system running at http://localhost:${port}`);
});