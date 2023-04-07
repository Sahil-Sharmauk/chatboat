import  express from 'express';
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
config()
const app = express();
const configuration = new Configuration({
    
    // organization: "org-v0lDFMFRRMNkcvWpSZaE876F",
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);


app.set('view engine', 'ejs')
app.use(express.json());


app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/chat',async (req,res)=>{
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: input}],
    });
    console.log(response.data.choices[0].message.content);
})
// const configuration = new Configuration({
//     // organization: "org-v0lDFMFRRMNkcvWpSZaE876F",
//     apiKey: process.env.API_KEY,
// });


app.listen(3100,()=>{
    console.log("App listening on 3100 port")
})