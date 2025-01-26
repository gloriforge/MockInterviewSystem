## AI-powered Interview Preparation
APIP is a interview system for students and professionals looking to prepare for interviews with ease. This AI-driven template simulates real interview scenarios, providing tailored questions and feedback to help users improve their responses.

## Live Demo
[https://ai-interview-mocker-wpbpjo.next.genez.io/](https://ai-interview-mocker-wpbpjo.next.genez.io/)

## Features
- Secure login with email/password.
- Experience realistic interview scenarios tailored to your field.
- Each Interview includes AI-generated questions.
- Receive AI-curated feedback on your responses.

## Technologies Used
- Next.js for Frontend and Backend
- Gemini API Key for AI-Powered Features
- Clerk authentication for Authorization
- Neondb for Postgresql

## Use Cases
- Simulate job interview scenarios with AI-generated questions based on the specified role and experience level.
- Practice and improve interview responses with instant AI-driven feedback. 
- Suitable for preparing for technical, behavioural, and general interviews.

## Installation Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/Jonas-Duncan/MockInterview.git
    ```

2. Navigate to the project directory:
    ```bash
    cd MockInterview
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up the environment variables:
   Create a .env file in the root directory as `.env.local` with the following environment variables:

    ```bash
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=''
    CLERK_SECRET_KEY=''
    NEXT_PUBLIC_CLERK_SIGN_IN_URL='/sign-in'
    NEXT_PUBLIC_CLERK_SIGN_UP_URL='/sign-up'
    NEXT_PUBLIC_DRIZZLE_DB_URL=''
    NEXT_PUBLIC_GEMINI_API_KEY=''
    ```

5. Set up the neon database:
    ```bash
    npm run db:generate
    npm run db:push
    ```

6. Run the development server:
    ```bash
    npm run dev
    ```
    Open the browser and go to `http://localhost:3000`.


## How to use the application
1. Sign in using email.
2. Add a new interview and provide the interview stage, job role, description, years of experience and number of questiosn.
3. Respond to AI-generated questions and record them for the feedback.
4. The AI will evaluate the answers and provide you with complete feedback.
5. History of user interviews is saved on the dashboard and a User can re-attempt the existing interviews from the dashboard as well.
