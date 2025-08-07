import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.post('/users', async (req, res) => {
  const user = req.body
  await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      age: user.age,
    }
  })
  .then(() => {
    res.status(201).send('User created successfully.')
  })
  .catch(error => {
    res.status(500).json({ error: error + ' An error occurred while creating the user.' })
  })
})

app.get('/users', async (req, res) => {
  await prisma.user.findMany()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => {
    res.status(500).json({ error: error + 'An error occurred while fetching users.' })
  })
})

app.put('/users/:id', async (req, res) => {
  const user = req.body
  await prisma.user.update({
    where: { id: req.params.id },
    data: {
      name: user.name,
      email: user.email,
      age: user.age,
    }
  })
  .then(() => {
    res.status(201).send('User edited successfully.')
  })
  .catch(error => {
    res.status(500).json({ error: error + ' An error occurred while editing the user.' })
  })
})

app.delete('/users/:id', async (req, res) => {
  await prisma.user.delete({
    where: { id: req.params.id }
  })
  .then(() => {
    res.status(200).send('User deleted successfully.')
  })
  .catch(error => {
    res.status(500).json({ error: error + ' An error occurred while deleting the user.' })
  })
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})

export default app