const express = require('express')
const { Client } = require('pg')
require('dotenv').config()
//conexão com banco de dados
const client = new Client({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
})

//mostra se a conexão foi bem sucedida
const connectDB = async () => {
    client.connect().then(() => {
        console.log('A conexão funcionou')
    }).catch((err) => {
        console.error('Erro ao conectar na db')
    })
}
connectDB()
const app = express()
//localhost na internet
app.get('/teste-api', function(req, res){
    res.send('Nossa api está funcionando')
})

app.listen(8000)









/*function Filtrarpares(arrey){
    return arrey.filter(num => num % 2 === 0)
}
console.log(Filtrarpares([1,2,3,4,5,6]))
*/
