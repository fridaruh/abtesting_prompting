# OpenAI A/B Testing Component

This React component allows users to perform A/B testing using the OpenAI API. It provides a user-friendly interface for inputting an API key and two different prompts, generates outputs using the OpenAI API, and allows users to rate the outputs. Finally, it calculates and displays the results of the A/B test.

## Features

- Input OpenAI API key securely
- Enter two different prompts for A/B testing
- Generate outputs using the OpenAI API
- Randomized output presentation for unbiased rating
- Simple thumbs up/down rating system
- Results calculation and display
- Error handling for API calls
- Loading state management

## Installation

1. Clone the repository:
git clone https://github.com/yourusername/openai-ab-testing.git
cd openai-ab-testing

2. Install dependencies:
npm install

3. Install necessary shadcn/ui components:
   
npx shadcn-ui@latest add alert-dialog button input card


## Usage

1. Start the development server:
npm start

2. Open your browser and navigate to `http://localhost:3000`.

3. Enter your OpenAI API key in the designated input field.

4. Input two different prompts in the "Prompt A" and "Prompt B" fields.

5. Click "Run Test" to generate outputs using the OpenAI API.

6. Rate each output using the thumbs up (good) or thumbs down (poor) buttons.

7. After rating all outputs, click "View Results" to see the A/B test results.

## Component Structure

The main component `OpenAIABTesting` is composed of several key functions:

- `runTest`: Calls the OpenAI API to generate outputs for both prompts.
- `rateOutput`: Handles the rating of each output.
- `calculateResults`: Computes the final scores for each prompt.

The component uses React hooks for state management and side effects.

## Customization

You can customize the appearance of the component by modifying the shadcn/ui components used. Refer to the [shadcn/ui documentation](https://ui.shadcn.com/) for more information on customizing these components.

## Environment Variables

To use a default API key, you can set up an environment variable:

1. Create a `.env` file in the root of your project.
2. Add the following line to the file:
REACT_APP_OPENAI_API_KEY=your-api-key
Copy3. Update the component to use this environment variable as a default value for the API key input.

Remember to add `.env` to your `.gitignore` file to avoid exposing your API key.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
