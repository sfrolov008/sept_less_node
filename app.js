const express = require('express');
const fs = require('fs');
const path = require('path');

// fs.appendFile(path.join('users.json'),JSON.stringify({name:'anja', age: 21, gender: 'female'}),(err)=>{
//     console.log(err);
// })

const users = require('./users.json')

const app = express();
const PORT = 5000;
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/users', (req, res) => {
    res.status(200).json(users)
})

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;
    const user = users[+userId];
    res.json(user);
})

app.post('/users', (req, res) => {
    const body = req.body;
    console.log(JSON.stringify(body));
    // fs.appendFile(path.join('users.json', body, (err)=>{
    //     if (err){
    //         console.log(err);
    //     }
    // }))
})

app.put('users/:userId', (req, res) => {
    const {userID} = req.params;
    const updatedUser = req.body;
    users[userID] = updatedUser;
    res.status(200).json({message:'user updated', data: users[+userID]})
})

app.delete('users/:userId', (req, res)=>{
    const {userID} = req.params;
    users.splice(+userID, 1)
    res.status(200).json({message:'user deleted'})
})

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)

});
