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

## OpenAI configuration

The preview screen uses the OpenAI ChatGPT API to generate letters. Provide your API key with the environment variable `EXPO_PUBLIC_OPENAI_API_KEY` when running the app:

```bash
EXPO_PUBLIC_OPENAI_API_KEY=sk-your-key npm run dev
```

Without this variable the letter generation will fail.

### Additional npm scripts

- `npm run build:web` – export the application as static web files.
- `npm run lint` – run Expo's linter.
