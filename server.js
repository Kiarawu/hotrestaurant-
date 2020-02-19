const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/table', (req, res) => {
  fs.readFile('table.json', 'utf8', (e, data) => {
    if (e) { console.log(e) }

    const employees = JSON.parse(data)

    res.json(employees)
  })
})

app.post('/table', (req, res) => {
  fs.readFile('table.json', 'utf8', (e, data) => {
    if (e) { console.log(e) }

    const employees = JSON.parse(data)

    employees.push(req.body)

    fs.writeFile('table.json', JSON.stringify(employees), e => {
      if (e) { console.log(e) }
      res.sendStatus(200)
    })
  })
})

app.listen(3000)