const express = require('express')
require('dotenv').config()
const connectDB = require('./db')

const app = express()

connectDB()

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
