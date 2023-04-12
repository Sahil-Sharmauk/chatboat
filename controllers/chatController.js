const { json } = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
// const {openai} = require("../openai")
const configuration = new Configuration({
    // organization: "org-v0lDFMFRRMNkcvWpSZaE876F",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);


const chat = async (req,res)=>{
    try{
        let {message} = req.body.message
        console.log(req.body.message)
        let input = req.body.message;
        console.log("input::>>",input, typeof input)
        input +="</->"
        console.log("input",input)
        // curie:ft-personal-2023-04-12-04-59-55
        const response = await openai.createCompletion({
            model: "curie:ft-personal-2023-04-11-10-32-49",
            prompt: input,
            max_tokens: 150,
            temperature: 0,
            stop:"<-->"
          });
      
        // console.log(response.data)
        console.log(response.data.choices[0]  );
        res.json({"data":response.data.choices[0].text.replace("-->" ,'')})
    }catch(err){
        console.log("error",err)
    }
}
module.exports =  chat;
// exports.chat = async (req,res)=>{
//     const response = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: [{role: "user", content: input}],
//     });
//     console.log(response.data.choices[0].message.content);

// }
