const express = require('express')
require('dotenv').config()
const {connectDB} = require('./db')
const rotas = require('./rotas')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

connectDB()

app.use('/usuarios', rotas)

app.listen(8000)








/*function Filtrarpares(arrey){
    return arrey.filter(num => num % 2 === 0)
}
console.log(Filtrarpares([1,2,3,4,5,6]))
*/
