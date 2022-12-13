import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// use backticks for template literal https://www.w3schools.com/js/js_string_templates.asp?utm_source=buildspace.so&utm_medium=buildspace_project
const basePromptPrefix = `
Write me the title for a horror story with these characters:
Characters: 
`;

const generateAction = async (req, res) => {
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

    // createCompletion https://beta.openai.com/docs/api-reference/completions/create?utm_source=buildspace.so&utm_medium=buildspace_project
    const baseCompletion = await openai.createCompletion({
        // list of models https://beta.openai.com/docs/models/gpt-3?utm_source=buildspace.so&utm_medium=buildspace_project
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}\n`,
        temperature: 0.8,
        max_tokens: 100,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    const secondPrompt = `
    Write me in Stephen King style the beginning, middle, plot-twist, and end of the horror story with the title
    Characters: ${req.body.userInput}
    Title: ${basePromptOutput.text}
    Story: 
    `

    const secondPromptCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${secondPrompt}\n`,
        temperature: 0.85,
        max_tokens: 500,
    });

    const secondPromptOutput = secondPromptCompletion.data.choices.pop();

    res.status(200).json({
        output: secondPromptOutput
    });
};

export default generateAction;