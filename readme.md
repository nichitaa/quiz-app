> Pasecinic Nichita
>
> quiz app game



A simple web app with quiz-game like functionality that makes usage of [this Quiz-API](https://pure-caverns-82881.herokuapp.com)  🎉



####  **Tech stack**

- TypeScript
- NextJS
- AntD
- Redux



####  **Features**

- view the list of all quizzes
- view a single quiz 
- create a new player (can randomize the name)
- playing a quiz for the created user
- submit the question response out of the question options
- show total score for the quiz
- user can create a quiz of a variable number of questions (user selects the questions number) 
- proper data validations: (for summited questions / quizzes, and for creating new quiz)
  - for summited quiz / question (disabled buttons / read-only options)
  - validation for create new quiz - dynamic form, validates the questions number limit, min 2 optional answers in one quiz, correct answer is included by default in question options, duplicated answers, handling [Quiz-API](https://pure-caverns-82881.herokuapp.com) errors



####  **Usage**

A single environment variable is need for the application to start and run in development mode, please create a `.env.local` file in the root of the project with following content:

```bash
NEXT_PUBLIC_SERVER_BASE_URL=http://localhost:3000/api
```
Start it with the script you now and love: [`npm run dev`](https://github.com/nichitaa/quiz-app/blob/d81ca44f29f9550c848d79450f7f953e479e8e68/package.json#L6)

The application is being deployed and hosted on Vercel currently - [link](https://quiz-app-nichitaa.vercel.app/) 




####  **Implementation**

​	Using [NextJS](https://nextjs.org/) as it is most well suited for our needs. All pages are being generated on build time ([SSG](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)), so the build mostly consists of a bunch of `HTML` files pre-generated that will be finally served. Adding a new quiz is possible because of the [Incremental Static Generation](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) support from NextJS, that allows of creating (quiz page - new `/quizzes/:id` route) and updating a static page (quizzes page - `/quizzes/` route) without needing to rebuild entire site. 

​	The calls to the [Quiz-API](https://pure-caverns-82881.herokuapp.com) are done via NextJS exposed application [API](./api/), meaning the quiz service is being accessible only from our server side code. [Redux](https://redux.js.org/) was used as a state management solution for the application state and for the visual part was used [antd](https://ant.design/) as UI library with [this](./theme/default.less) less variables for theme customization  (can be easily added a new theme option). 

Some things that are worth considering for improvements:

- move the [Quiz-API keys](https://github.com/nichitaa/quiz-app/blob/d81ca44f29f9550c848d79450f7f953e479e8e68/services/quizApi.ts#L15) to environment variables as [this constant](https://github.com/nichitaa/quiz-app/blob/d81ca44f29f9550c848d79450f7f953e479e8e68/config/constants.ts#L1)
- remove the react inline styles [usages](https://github.com/nichitaa/quiz-app/blob/d81ca44f29f9550c848d79450f7f953e479e8e68/pages/quizzes/%5BquizId%5D.tsx#L66) (excusable 😄)
- better types with documentation
- add a light theme 🌞









