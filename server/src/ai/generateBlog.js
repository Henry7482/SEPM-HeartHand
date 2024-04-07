import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({
  path: "/Users/tranphantrongphuc/Documents/GitHub/SEPM-HeartHand/server/.env",
});

let token_used;
const MAXRETRIES = 3;

let genrerateBLog = async (keywords) => {
  // Configuration and API setup
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
  });

  const chatHistory = [];
  const json_example = {
    title: "Vietnam's COVID-19 Crisis",
    shortform:
      "Vietnam is currently facing a severe COVID-19 outbreak, with the virus claiming the lives of over 10 people in Hanoi alone. Families across the country are devastated by the loss of their loved ones, and the situation is dire.",
    content:
      "The government has implemented strict lockdown measures to curb the spread of the virus, but the situation remains grim. The people of Vietnam are in desperate need of help, and the international community must come together to support them in this difficult time.",
  };

  // Prompt Input
  const prompt =
    "Provide output in valid JSON. Write a short blog about the current unfortunate condition in Vietnam which CLOSELY represents the following keywords: " +
    keywords +
    ". Provide one column for 'title' for the engaging title of the blog, another column for 'shortform' for the short summary of the blog, and the last column for 'content' for the detailed content of the blog with 100 words only.";

  // Chat History for Context
  const messageList = chatHistory.map(([input_text, completion_text]) => ({
    role: "user" === input_text ? "ChatGPT" : "user",
    content: input_text,
  }));

  // Enter User Input
  messageList.push({
    role: "system",
    content:
      "Provide output in valid JSON. The data schema is as follows:" +
      JSON.stringify(json_example),
  });
  messageList.push({ role: "user", content: prompt });

  let json_output = null;
  let valid_output = false;
  let count = 0;

  while (!valid_output && count < MAXRETRIES) {
    try {
      // AI Model
      const GPTOutput = await openai.chat.completions.create({
        messages: messageList,
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      });

      // // AI Model Response
      const output_text = GPTOutput.choices[0].message.content;
      token_used = GPTOutput.usage;
      const finish_reason = GPTOutput.choices[0].finish_reason;

      // console.log(output_text);

      // Check for output exceptions
      if (finish_reason == "length") {
        console.log(
          "Insufficient token led to incomplete respond. Please try again."
        );
        count++;
        continue;
      } else if (finish_reason != "stop") {
        console.log(
          "Model stopped responding. Reason: " +
            finish_reason +
            ". Please try again."
        );
        count++;
        continue;
      }

      // Convert output to JSON
      json_output = JSON.parse(output_text);

      valid_output = true;
    } catch (err) {
      if (err.response) {
        console.log("Status: " + err.response.status);
        console.log("Error: " + err.response.data);
      } else {
        console.log("Error: " + err.message);
      }
      count++;
    }
  }

  return json_output;
};


// // Testing
// const keywords = [
//   "Vietnam",
//   "COVID",
//   "kill 10 people",
//   "Hanoi",
//   "family sad",
// ];

// const output = await genrerateBLog(keywords);

// console.log("Output:");
// console.log(output);

// console.log("Token Usage:");
// console.log(JSON.stringify(token_used));

export default genrerateBLog;