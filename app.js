const express = require('express');
const fsService = require('./fs.service')


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/users', async (req, res) => {
    const users = await fsService.reader()
    res.json(users)
})

app.post('/users', async (req, res) => {
    const {name, age, gender} = req.body;

    if (!name || name.length < 2) {
        res.status(400).json('wrong name')
    }
    if (!age || age < 0 || !Number.isInteger(age) || Number.isNaN(age)) {
        res.status(400).json('wrong age')
    }
    if (!gender || (gender !== 'male' && gender !== 'female')) {
        res.status(400).json('wrong gender')
    }

    const users = await fsService.reader()
    const newUser = {
        id: users[users.length - 1]?.id + 1 || 1,
        name,
        age,
        gender
    }
    users.push(newUser)
    await fsService.writer(users)

    res.status(201).json(newUser)
});

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const users = await fsService.reader()
    const user = users.find(user => user.id === +userId)

    if (!user) {
        res.status(422).json('user not found')
    }
    res.status(200).json(user)
})

app.patch('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const {name, age, gender} = req.body;

    if (name && name.length < 2) {
        res.status(400).json('wrong name')
    }
    if (age && age < 0 || !Number.isInteger(age) || Number.isNaN(age)) {
        res.status(400).json('wrong age')
    }
    if (gender && (gender !== 'male' && gender !== 'female')) {
        res.status(400).json('wrong gender')
    }

    const users = await fsService.reader()
    const index = users.findIndex((user) => user.id === +userId)

    users[index] = {...users[index], ...req.body}

    await fsService.writer(users);
    res.status(201).json('newUser')
});

app.delete('/users/:userId', async (req, res)=>{
    const {userId} = req.params
    const users = await fsService.reader()
    const index = users.findIndex((user) => user.id === +userId)

    users.splice(index, 1)
    await fsService.writer(users)

    res.sendStatus(204);
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
});
