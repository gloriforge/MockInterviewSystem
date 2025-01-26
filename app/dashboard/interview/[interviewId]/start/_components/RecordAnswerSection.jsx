// Recording user responses on interview screen
"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle, Upload, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModal'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { Textarea } from '@/components/ui/textarea'

const apiKey = process.env.NEXT_PUBLIC_SPEECH_API_KEY;
function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [inputMode, setInputMode] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    crossBrowser: true,
    googleApiKey: apiKey,
    useLegacyResults: false,
    speechRecognitionProperties: {
      lang: 'en-US',
      interimResults: true // Allows for displaying real-time speech results
    }
  });

  useEffect(() => {
    if (results?.length > 0)
      setUserAnswer(prevAns => prevAns + results[results.length - 1]?.transcript)
  }, [results])

  // useEffect(() => {
  //   if (!isRecording && userAnswer?.length > 0) {
  //     submitAnswer(userAnswer);
  //   }
  // }, [userAnswer])

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      submitAnswer(userAnswer);
    }
    else {
      setUserAnswer('');
      startSpeechToText();
    }
  }

  // Saving AI-generated question, AI-generated answer, user response, feedback, rating and user details to db  
  const submitAnswer = async () => {
    if (userAnswer?.length > 0) {
      setLoading(true);

      const feedbackPrompt = "Question:" + mockInterviewQuestion[activeQuestionIndex]?.question +
        ", User Answer:" + userAnswer + ",Depends on question and user answer for given interview question " +
        " please give us rating for answer and feedback as area of improvmenet if any " +
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
      const JsonFeedbackResp = JSON.parse(mockJsonResp);
      try {
        const resp = await db.insert(UserAnswer)
          .values({
            mockIdRef: interviewData?.mockId,
            question: mockInterviewQuestion[activeQuestionIndex]?.question,
            correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
            userAns: userAnswer,
            feedback: JsonFeedbackResp?.feedback,
            rating: JsonFeedbackResp?.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-yyyy')
          })
        // Prompt on screen to indicate user response is recorded successfully
        if (resp) {
          toast('User Answer submitted successfully');
        }
      } catch (error) {
        console.log(error);
      }

      setResults([]);
      setLoading(false);
    }
    else
      toast("Please input your answer.");
  }

  const UpdateUserAnswer = async () => {
    console.log(userAnswer)
    setLoading(true)
  }

  const changeInputMode = () => {
    setInputMode((prev) => !prev);
  }
  //  Setting up the webcam section
  return (
    <div className='flex items-center justify-center flex-col w-full'>
      {/* <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
        <Image src={'/webcam.png'} width={200} height={200}
          className='absolute' />
        <Webcam
          mirrored={true}
          style={{
            height: 500,
            width: 500,
            zIndex: 10,
          }}
        />
      </div> */}
      <div className='flex flex-col w-full h-full'>
        {
          !inputMode ?
            <>
              <h2 className='text-md md:text-lg'>Your Transcript:</h2>
              <div className='flex flex-col w-full h-full border rounded-lg mt-5 p-5'>
                <h2 className='text-md text-black'>{userAnswer}</h2>
              </div>
            </> :
            <>
              <Textarea
                className='h-full text-md'
                placeholder="Type your answer"
                required
                onChange={(event) => setUserAnswer(event.target.value)}
              />
            </>
        }
      </div>
      {
        !inputMode ?
          <Button
            disabled={loading}
            variant="outline"
            className='mt-5'
            onClick={StartStopRecording}
          >
            {
              loading ?
                <>
                  <LoaderCircle className='animate-spin' /> Submitting
                </> :
                (
                  isRecording ?
                    <h2 className='text-black animate-pulse flex gap-2 items-center'>
                      <StopCircle />Stop Recording
                    </h2> :
                    <h2 className='text-black flex gap-2 items-center'>
                      <Mic />  Record Answer</h2>
                )
            }
          </Button> :
          <Button
            disabled={loading}
            variant="outline"
            className='mt-5'
            onClick={submitAnswer}
          >
            <h2 className='text-black flex gap-2 items-center'>
              {loading ?
                <>
                  <LoaderCircle className='animate-spin' /> Submitting
                </> :
                <>
                  <Upload />  Submit Answer
                </>
              }
            </h2>
          </Button>
      }
      <Button
        disabled={loading || isRecording}
        className="mt-2 bg-transparent hover:bg-transparent"
        onClick={changeInputMode}
      >
        <h2 className='text-black flex items-center underline hover:text-purple-600'>
          {
            inputMode ?
              'Or record your answer' :
              'Or type your answer'
          }
        </h2>
      </Button>

    </div>
  )
}

export default RecordAnswerSection