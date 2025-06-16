# Assistant Courrier

Assistant Courrier est une application React Native (Expo) permettant de générer rapidement des courriers personnalisés.

## Prérequis

- Node.js 18 ou version supérieure
- npm

## Installation

```bash
npm install
```

## Commandes utiles

- `npm run dev` : démarre le serveur de développement Expo.
- `npm run build:web` : génère la version web statique.
- `npm run lint` : lance le linter.

## Écrans principaux

- **Accueil** : présente un résumé des statistiques et des raccourcis pour créer un courrier ou accéder à l'historique.
- **Création** : choix du type de courrier, saisie du destinataire et des informations spécifiques puis génération du contenu.
- **Prévisualisation** : affiche le texte généré avant de l'enregistrer ou de le partager.
- **Historique** : liste des courriers précédemment générés avec possibilité de suppression.
- **Paramètres** : gestion du profil utilisateur utilisé lors de la génération.


## Configuration

Set the `API_BASE_URL` environment variable to configure the backend URL. You
can copy `.env.example` and adjust the value:

```bash
cp .env.example .env
```

`utils/apiConfig.ts` reads this value at runtime. If the variable is not
provided, the helper falls back to `app.json` `extra.API_BASE_URL` and finally to
`https://assistant-backend-yrbx.onrender.com`.

## Features

## Fonctionnement de la génération de courrier


Les données renseignées dans les formulaires sont combinées avec le profil utilisateur pour créer un *prompt* envoyé à l'API configurée dans `utils/apiConfig.ts`. La fonction `generateLetter` du fichier [`letterService.ts`](services/letterService.ts) se charge de réaliser l'appel réseau puis renvoie le contenu du courrier.


- Create letters
- View history
- Manage settings
- Preview letters

## License

This project is licensed under the [MIT License](LICENSE).

