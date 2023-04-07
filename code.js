import  express from 'express';
import bodyParser from 'body-parser';
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import readline from 'readline'
config()
const app = express();
app.use(express.json());
const configuration = new Configuration({
    // organization: "org-v0lDFMFRRMNkcvWpSZaE876F",
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);
const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
userInterface.prompt()
userInterface.on("line",async(input)=>{
    await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "about animals only",
        max_tokens: 7,
        temperature: 0,
    });
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: input}],
    });
    console.log(response.data.choices[0].message.content);
    userInterface.prompt()

})
//Lists the currently available models, and provides basic information about each one such as the owner and availability.

const modelLists = await openai.listModels();
// console.log("modelLists:::>>>",modelLists.data)

//Retrieves a model instance, providing basic information about the model such as the owner and permissioning.

const retrieveModel = await openai.retrieveModel("text-davinci-003"); 
// console.log("retrieveModel:::>>>",retrieveModel.data)

//Completions
// Given a prompt, the model will return one or more predicted completions, and can also return the probabilities of alternative tokens at each position.


// 1.)Create completion => Creates a completion for the provided prompt and parameters

const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "How are you?",
    max_tokens: 10,
    temperature: 1,
    logprobs: 1,
    // echo:true
  });
// console.log("completion:>>>>>",completion.data.choices)
// app.listen(3100,()=>{
//     console.log("APp listening on 3100 port")
// })