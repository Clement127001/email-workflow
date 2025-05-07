# Email Workflow

## Backend

### Tech Stack

- Express
- Mongo DB
- Node
- Nodemailer for mail service
- Agenda for scheduling

### setup

- note : setup the env file before starting the backend

- if you have any issue setting up the app password checkout - https://stackoverflow.com/questions/60701936/error-invalid-login-application-specific-password-required

```
PORT=3000
MONGO_URI=<your mongo db uri>
JWT_LIFETIME=7d
EMAIL_USER=<email>
EMAIL_PASS=<app password from google>
```

- start dev server:

```
npm run start
```

## Frontend

### Tech Stack

- React
- Next Js
- Tailwind CSS
- Shadcn UI for components
- React flow for creating workflows

- start dev server:

```
npm run dev
```

- Note! : Change the baseApiUrl in client/src/utils/common

```
export const baseApiUrl = "http://localhost:3000/api";
```
