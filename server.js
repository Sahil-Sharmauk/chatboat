const  express = require('express');
require('dotenv').config()
const  { Configuration, OpenAIApi } = require("openai");
const route = require('./routes/router.js');
const  path = require('path')
const bodyparser = require("body-parser")
const app = express();



app.use(express.json());
app.use(bodyparser.urlencoded({ extended : true}))

app.set('view engine', 'ejs')

app.use('/css', express.static(path.resolve(__dirname , "assets/css")))
app.use('/img', express.static(path.resolve(__dirname , "assets/img")))
app.use('/js', express.static(path.resolve(__dirname , "assets/js")))

app.use('/', route)

app.listen(3100,()=>{
    console.log("App listening on 3100 port")
})