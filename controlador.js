const {client} = require('./db')
const bcryptjs = require('bcryptjs')
const jwt = require('jwt')

const listUsers = async (req, res) => {
    res.send('Lista de usuários')
}

const createUser = async (req, res) => {
    try {
        const {nome, email, senha} = req.body
        const senhacripto = await bcryptjs.hashSync(senha, 10)
        const sql = `INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *`
        const dados = await client.query(sql, [nome, email, senhacripto])
        res.status(201).json({msg: 'O usuário foi criado com sucesso'})
    } catch (err){
        res.status(err).json({msg: err.message})
    }
}

const getUser = async (req, res) => {
    res.send('Pegou um usuário')
}

const deleteUser = async (req, res) => {
    try{
        const id = req.params.id
        const sql = `DELETE FROM usuarios WHERE id = $1`
        const dados = await client.query(sql, [id])
        res.status(200).json({msg: 'O usuário foi deletado com sucesso'})
    }catch(err){
        res.status(err).json({msg: err.message})
    }
}

const login = async (req, res) => {
    try{
        const {email, senha} = req.body
        const sql = `SELECT * FROM usuarios WHERE email = $1`
        const usuario = await client.query(sql, [email])
        res.send(200)
        const validSenha = bcryptjs.compareSync(senha, usuario.rows[0].senha)
        console.log(validSenha)
        // todo fazer if else se a senha for valida
        const token = jwt.sign(
            {
                _id: usuario.rows[0].id,
                email: usuario.rows[0].email,
                nome: usuario.rows[0].nome,
            },
            process.env.jwt_secret_key,
            { expiresIn: 1000*60*60*24*3 }
        )
        res.status(200).cookie("ROGERIO", token, {}).json({msg: "você efetuou o login"})
        
    }catch (err){
        console.log(err)
        res.send(500)
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const {nome, email} = req.body
        const sql = `UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING *`
        const dados = await client.query(sql, [nome, email, id])
        console.log(dados)
        res.status(201).json({msg: 'O usuário foi atualizado com sucesso'})
    } catch (err){
        res.status(500).json({msg: err.message})
    }
}



module.exports = {listUsers, createUser, getUser, deleteUser, updateUser, login}