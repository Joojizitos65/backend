const { Client } = require('pg')
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
module.exports = connectDB