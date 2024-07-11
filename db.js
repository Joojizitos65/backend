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

const setup = async (req, res) => {
    try{
        const data = await client.query('CREATE TABLE usuarios (nome VARCHAR(100), email VARCHAR(50), id SERIAL PRIMARY KEY, senha VARCHAR(40) ) ')
        res.status(200).json({msg: 'A TABELA FOI CRIADA'})
    } catch(err) {
        console.log('Erro ao criar a tabela')
        res.status(500)
    }
}


module.exports = {connectDB, setup, client}