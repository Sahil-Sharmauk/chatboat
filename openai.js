import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
config()
const configuration = new Configuration({
    
    // organization: "org-v0lDFMFRRMNkcvWpSZaE876F",
    apiKey: process.env.API_KEY,
});
console.log("HERE")
const openai = new OpenAIApi(configuration);

export default openai;