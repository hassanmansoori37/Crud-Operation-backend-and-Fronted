import express, { json } from 'express'
import { postRouter } from './routes/index.js'
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/v1' , postRouter)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})