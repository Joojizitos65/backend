const express = require('express')
const app = express()

app.get('/teste-api', function(req, res){
    res.send('Nossa api está funcionando')
})

app.listen(8000)









function Filtrarpares(arrey){
    return arrey.filter(num => num % 2 === 0)
}
console.log(Filtrarpares([1,2,3,4,5,6]))

