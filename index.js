import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

let trabalhadores = []

app.get('/', (req, res) => res.json(trabalhadores))

app.post('/', (req, res) => {
  const {
    nome,
    funcao,
    salario
  } = req.body

  const id = (1 + trabalhadores[trabalhadores.length -1]?.id) || 1

  const novoTrabalhador = {
    id,
    nome,
    funcao,
    salario
  }

  trabalhadores.push(novoTrabalhador)

  res.json(novoTrabalhador)
})

app.put('/:id', (req, res) => {
  const {
    nome,
    funcao,
    salario
  } = req.body

  const id = Number(req.params.id)

  for(let i = 0; i < trabalhadores.length; i++){
    if(trabalhadores[i].id !== id) {
      continue
    }else{
      trabalhadores[i].nome = nome
      trabalhadores[i].funcao = funcao
      trabalhadores[i].salario = salario
      break
    }
  }

  res.json(trabalhadores)
})

app.delete('/:id', (req, res) => {
  const id = Number(req.params.id)

  trabalhadores = trabalhadores.filter(trabalhador => trabalhador.id !== id)

  res.json(trabalhadores)
})

app.listen(process.env.PORT || 3000)