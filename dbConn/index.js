const express = require('express')
require('./conn/connection')
const itemRou = require('./routers/itemRou')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(itemRou)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})