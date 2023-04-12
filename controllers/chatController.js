const { json } = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
const natural = require('natural');
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);


const chat = async (req,res)=>{
  
    try{
        let {message} = req.body.message
        console.log(req.body.message)
        let input = req.body.message;
        const embedding_input = await openai.createEmbedding({
          model: "text-embedding-ada-002",
          input: input,
        });
        let userEmbedding = embedding_input.data.data[0].embedding
        console.log("embedding_input",embedding_input.data.data[0].embedding)
        input +="</->"
        console.log("input",input)
        // curie:ft-personal-2023-04-12-04-59-55
        //

        const response = await openai.createCompletion({
            model: "curie:ft-personal-2023-04-11-10-32-49",
            prompt: input,
            max_tokens: 150,
            temperature: 0,
            stop:"<-->"
          });
        const embedding_response = await openai.createEmbedding({
          model: "text-embedding-ada-002",
          input: response.data.choices[0].text,
        });
        console.log("embedding_response",embedding_response.data.data[0].embedding)
        let responseEmbedding = embedding_response.data.data[0].embedding

        await calculateCosineSimilarity(userEmbedding,responseEmbedding)
        console.log(response.data.choices[0]  );
        res.json({"data":response.data.choices[0].text.replace("-->" ,'')})
    }catch(err){
        console.log("error",err)
    }
}
module.exports =  chat;



async function calculateCosineSimilarity(userEmbedding,responseEmbedding){

const userQueryEmbedding = userEmbedding 
const generatedResponseEmbedding = responseEmbedding 

const v1 = natural.Vector(userQueryEmbedding);
const v2 = natural.Vector(generatedResponseEmbedding);

const cosineSimilarity = v1.cosineSimilarity(v2);

console.log("similarity>>>>>>>",cosineSimilarity)
// Check if the similarity is above a certain threshold to determine relevance
  if (cosineSimilarity > 0.8) {
    console.log('Generated response is relevant to user query');
  } else {
    console.log('Generated response may not be relevant to user query');
}


}
