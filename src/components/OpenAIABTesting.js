import React, { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import OpenAI from "openai";

const OpenAIABTesting = () => {
  const [apiKey, setApiKey] = useState('');
  const [promptA, setPromptA] = useState('');
  const [promptB, setPromptB] = useState('');
  const [outputs, setOutputs] = useState([]);
  const [currentOutput, setCurrentOutput] = useState(0);
  const [scores, setScores] = useState({ A: [], B: [] });
  const [testingComplete, setTestingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const runTest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const openai = new OpenAI({ apiKey: apiKey });
      const prompts = [promptA, promptB];
      const allOutputs = [];

      for (let prompt of prompts) {
        for (let i = 0; i < 5; i++) {
          const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: prompt },
            ],
          });
          allOutputs.push({
            text: completion.choices[0].message.content,
            prompt: prompt === promptA ? 'A' : 'B'
          });
        }
      }

      setOutputs(allOutputs.sort(() => Math.random() - 0.5));
      setCurrentOutput(0);
    } catch (err) {
      setError("An error occurred while fetching from OpenAI. Please check your API key and try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const rateOutput = (score) => {
    const output = outputs[currentOutput];
    setScores(prevScores => ({
      ...prevScores,
      [output.prompt]: [...prevScores[output.prompt], score]
    }));

    if (currentOutput === outputs.length - 1) {
      setTestingComplete(true);
    } else {
      setCurrentOutput(prevOutput => prevOutput + 1);
    }
  };

  const calculateResults = () => {
    const averageScore = (scores) => scores.reduce((a, b) => a + b, 0) / scores.length;
    return {
      A: averageScore(scores.A),
      B: averageScore(scores.B)
    };
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>OpenAI A/B Testing</CardTitle>
          <CardDescription>Test different prompts with OpenAI</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Enter OpenAI API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            type="password"
          />
          <Input
            placeholder="Enter Prompt A"
            value={promptA}
            onChange={(e) => setPromptA(e.target.value)}
          />
          <Input
            placeholder="Enter Prompt B"
            value={promptB}
            onChange={(e) => setPromptB(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={runTest} className="w-full" disabled={isLoading}>
            {isLoading ? 'Running Test...' : 'Run Test'}
          </Button>
        </CardFooter>
      </Card>

      {error && (
        <Card>
          <CardContent className="text-red-500 pt-4">
            {error}
          </CardContent>
        </Card>
      )}

      {outputs.length > 0 && currentOutput < outputs.length && (
        <Card>
          <CardHeader>
            <CardTitle>Rate Output</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{outputs[currentOutput].text}</p>
          </CardContent>
          <CardFooter className="justify-between">
            <Button onClick={() => rateOutput(0)} variant="outline"><ThumbsDown className="mr-2 h-4 w-4" /> Poor</Button>
            <Button onClick={() => rateOutput(1)} variant="outline"><ThumbsUp className="mr-2 h-4 w-4" /> Good</Button>
          </CardFooter>
        </Card>
      )}

      {testingComplete && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full">View Results</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Test Results</AlertDialogTitle>
              <AlertDialogDescription>
                Prompt A Score: {calculateResults().A.toFixed(2)}
                <br />
                Prompt B Score: {calculateResults().B.toFixed(2)}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Close</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default OpenAIABTesting;