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

## Fonctionnement de la génération de courrier


Les données renseignées dans les formulaires sont combinées avec le profil utilisateur pour créer un *prompt* envoyé à l'API située à `https://assistant-backend-yrbx.onrender.com`. La fonction `generateLetter` du fichier [`letterService.ts`](services/letterService.ts) se charge de réaliser l'appel réseau puis renvoie le contenu du courrier.

- Create letters
- View history
- Manage settings
- Preview letters

## License

This project is licensed under the [MIT License](LICENSE).

