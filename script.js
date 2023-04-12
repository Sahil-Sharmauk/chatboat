const fs = require("fs")
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// async function call(){
//   // let response = await openai.createFile(
//   //   fs.createReadStream("test2.jsonl"),
//   //   "fine-tune"
//   // )

//   // const response =  await openai.listFiles()

//   // const response =  await openai.createFineTune({
//   //   training_file: "file-4Q6bhLxvxaWXXmxMvGOZuj0J",
//   // })

//    const response =  await openai.retrieveFineTune("ft-chi8TV4QhFqqAvTJe7i2ICub")
//   console.log("response",response)
// }
// call()




  

 

  
  // {
    // Prepare your training data
  const trainingData = [
    { prompt: "How do I place an order?", response: "You can place an order by visiting our website and selecting the products you want to buy." },
    { prompt: "What payment methods do you accept?", response: "We accept credit card, PayPal, and bank transfer payments." },
    { prompt: "Can I cancel my order?", response: "Yes, you can cancel your order by contacting our customer service department." },
    { prompt: "What is your return policy?", response: "We offer a minimum 30-day return policy for all of our products. If you are not satisfied with your purchase, you can return it for a full refund." }
  ];
  
  // Format the training data for the OpenAI API
  const examples = trainingData.map(({ prompt, response }) => ({
    prompt: prompt,
    completions: [{ choice: response }]
  }));
  console.log("examples::::>>>",examples[0].completions)
  
  // // Train your chatbot using the OpenAI API
  const model = 'GPT-3';
  const prompt = 'Can I cancel my order?';
  const maxTokens = 50;
  const numResponses = 1;
  
  openai.createCompletion({
    model: model,
    prompt: prompt,
    max_tokens: maxTokens,
    n: numResponses,
    examples: examples,
    temperature: 0.5
  }).then(response => {
    console.log(response.data);
  }).catch(error => {
    console.error(error);
  });

  // model: "curie:ft-personal-2023-04-10-12-27-55",
  // prompt: req.body.message,
  // max_tokens: 150,
  // temperature: 0,
  // }
  