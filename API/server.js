import express from 'express'

const app = express()
app.use(express.json())

const users = []

app.post('/users', (req, res) => {
  const user = req.body
  users.push(user)
  res.status(201).send('User created!')
})

app.get('/users', (req, res) => {
  res.status(200).json(users)
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})

export default app