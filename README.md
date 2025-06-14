# Assistant Courrier

A React Native application built with [Expo](https://expo.dev/).

## Requirements

- [Node.js](https://nodejs.org/) (version 18 or newer)
- Expo CLI (install via `npm install --global expo-cli` or use `npx expo`)

## Setup

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The `dev` script launches the Expo development server. Follow the instructions in the terminal to open the app in a simulator, the Expo Go app, or a web browser.

## Serverless API configuration

The preview screen now calls a serverless function (`api/generate-letter.ts`) which hides the OpenAI API key on the server. Configure the following environment variables:

- `OPENAI_API_KEY` – used by the serverless function. **Do not commit this key.**
- `EXPO_PUBLIC_API_URL` – base URL of your deployment (e.g. `https://your-app.vercel.app`).

Run the app with:

```bash
OPENAI_API_KEY=sk-your-key EXPO_PUBLIC_API_URL=https://your-app.vercel.app npm run dev
```

### Additional npm scripts

- `npm run build:web` – export the application as static web files.
- `npm run lint` – run Expo's linter.
