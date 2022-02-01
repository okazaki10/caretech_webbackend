const express = require('express')
const app = express()
const productRoute = require("./routes/product_route")
const cors = require('cors')
const mongoose = require('mongoose');

global.URI = "https://api.github.com"
mongoose.connect(
    "mongodb+srv://caretech:caretech@cluster0.4awcc.mongodb.net/caretech?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: "caretech" },
    () => {
        console.log('connected')
    })
app.use(cors())
app.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}))
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));

app.use('/product', productRoute)

app.listen(5000)