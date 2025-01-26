// Popup screen to get the interview details
"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModal'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'

function AddNewInterview() {
    const interviewStageOptions = [
        'Introduction Stage',
        'Technical Stage',
        'Behavioral Stage'
    ];
    const [openDailog, setOpenDailog] = useState(false)
    const [interviewStage, setInterviewStage] = useState('Introduction Stage');
    const [jobPosition, setJobPosition] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [loading, setLoading] = useState(false);
    const [questionCount, setQuestionCount] = useState();
    const [jsonResponse, setJsonResponse] = useState([]);
    const router = useRouter();
    const { user } = useUser();
    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        const optional = interviewStage === 'Introduction Stage' ? ' and not technical ' : ''
        // Creating a prompt based upon the user's interview details
        //        const InputPrompt = "Interview Stage: " + interviewStage + optional + ", Job position: " + jobPosition + ", Job Description: " + jobDesc + ", Years of Experience : " + jobExperience + " , Depends on Interview Stage, Job Position, Job Description & Years of Experience give us " + questionCount + " Interview question along with Answer in JSON format, Give us question and answer field on JSON"

        const InputPrompt = `
            Interview Stage: ${interviewStage + optional}, 
            Job position: ${jobPosition},
            Job Description: ${jobDesc},
            Years of Experience : ${jobExperience},
            Depends on Interview Stage, Job Position, Job Description & Years of Experience give us ${questionCount} Interview question along with Answer, Hint and the description about this interview within 500 words in JSON format.
            JSON format is 
            {
                description: description,
                questions: [
                    {
                        question:question,
                        answer:answer,
                        hint:hint
                    },
                    {
                        question:question,
                        answer:answer,
                        hint:hint
                    },
                    {
                        question:question,
                        answer:answer,
                        hint:hint
                    }
                ]
            }.
        `;

        console.log(InputPrompt);
        //  Handling the API's response
        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp = JSON.parse((result.response.text()).replace('```json', '').replace('```', ''))

        console.log(MockJsonResp['questions']);

        if (MockJsonResp) {
            const resp = await db.insert(MockInterview)
                .values({
                    mockId: uuidv4(),
                    interviewStage: interviewStage,
                    jsonMockResp: MockJsonResp['questions'],
                    jobPosition: jobPosition,
                    jobDesc: jobDesc,
                    jobExperience: jobExperience,
                    description: MockJsonResp['description'],
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-yyyy')
                }).returning({ mockId: MockInterview.mockId });


            if (resp) {
                setOpenDailog(false);
                router.push('/dashboard/interview/' + resp[0]?.mockId)
            }
        }
        else {
            console.log("ERROR");
        }
        setLoading(false);
    }
    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary
        hover:scale-105 hover:shadow-md cursor-pointer
         transition-all border-dashed'
                onClick={() => setOpenDailog(true)}
            >
                <h2 className='text-lg text-center'>+ Add New</h2>
            </div>
            {/* Dailog box to retreive user's interview details */}
            <Dialog open={openDailog}>

                <DialogContent
                    className="max-w-2xl max-h-full overflow-auto"
                    close={() => setOpenDailog(false)}
                >
                    <DialogHeader >
                        <DialogTitle className="text-2xl" >Tell us more about your job interviwing</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Add Details about yout job position/role, Job description and years of experience</h2>
                                    <div className='mt-7 my-3'>
                                        <label>Interview Stage</label>
                                        <Select className='my-1' type='select' placeholder="Ex. Full Stack Developer" options={interviewStageOptions}
                                            onChange={(event) => setInterviewStage(event.target.value)}
                                        />
                                    </div>
                                    <div className='my-3'>
                                        <label>Job Role/Job Position</label>
                                        <Input className='my-1' placeholder="Ex. Full Stack Developer" required
                                            onChange={(event) => setJobPosition(event.target.value)}
                                        />
                                    </div>
                                    <div className=' my-3'>
                                        <label>Job Description/ Tech Stack (In Short)</label>
                                        <Textarea className='my-1' placeholder="Ex. React, Angular, NodeJs, MySql etc"
                                            required
                                            onChange={(event) => setJobDesc(event.target.value)} />
                                    </div>
                                    <div className=' my-3'>
                                        <label>Years of experience</label>
                                        <Input className='my-1' placeholder="Ex.5" type="number" max="100"
                                            required
                                            onChange={(event) => setJobExperience(event.target.value)}
                                        />
                                    </div>
                                    <div className=' my-3'>
                                        <label>Number of questions</label>
                                        <Input className='my-1' placeholder="Ex.5" type="number" max="100" min='1'
                                            required
                                            onChange={(event) => setQuestionCount(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type="button" variant="ghost" onClick={() => setOpenDailog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading} >
                                        {loading ?
                                            <>
                                                <LoaderCircle className='animate-spin' /> Generating from AI
                                            </> : 'Start Interview'
                                        }
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview