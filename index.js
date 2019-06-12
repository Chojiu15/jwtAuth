const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()

app.post('/api/post', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        }
        else {
            res.json({
                message: 'Post created',
                authData
            })
        }
    })

})

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        name: 'Jhondo',
        email: 'jhondo@gmail.com'
    }
    jwt.sign({ user }, 'secret', {expiresIn : '30sec'}, (err, token) => {
        res.json({
            token
        })
    })
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()

    }
    else {
        res.sendStatus(403)
    }
}

app.listen(3001, () => console.log('Server is running on port 3001'))