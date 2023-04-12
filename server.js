const  express = require('express');
const config =  require("dotenv");
const  { Configuration, OpenAIApi } = require("openai");
const route = require('./routes/router.js');
const  path = require('path')
const bodyparser = require("body-parser")
// const {connectOpenApi} = require("./openai.js")
const app = express();
// connectOpenApi()
// const configuration = new Configuration({
    
//     // organization: "org-v0lDFMFRRMNkcvWpSZaE876F",
//     apiKey: process.env.API_KEY,
// });

// const openai = new OpenAIApi(configuration);

app.use(express.json());
// app.use(bodyparser.urlencoded({ extended : true}))

app.set('view engine', 'ejs')

app.use('/css', express.static(path.resolve(__dirname , "assets/css")))
app.use('/img', express.static(path.resolve(__dirname , "assets/img")))
app.use('/js', express.static(path.resolve(__dirname , "assets/js")))
console.log("dirname",__dirname)

app.use('/', route)

app.listen(3100,()=>{
    console.log("App listening on 3100 port")
})