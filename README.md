# 🏭 Warehouse Management 

Une application moderne et intuitive de gestion de stock conçue pour simplifier et optimiser la gestion des inventaires pour les magasiniers. L'application permet une gestion rapide du stock grâce au scan de codes-barres et à l'entrée manuelle, un suivi en temps réel des produits, ainsi qu'une ajout simplifié de nouveaux produits via un formulaire interactif.

Objectifs principaux :



Simplifier les processus de gestion de stock.
Réduire les erreurs humaines.
Offrir des informations en temps réel sur les niveaux de stock et les détails des produits.
[![Expo Version](https://img.shields.io/badge/expo-%5E49.0.0-brightgreen)](https://expo.io/)
[![React Native Version](https://img.shields.io/badge/react%20native-%5E0.72.4-blue)](https://reactnative.dev/)


## 🌐 Planicfication Jira 
 [![Jira Icon](https://img.icons8.com/color/48/000000/jira.png)](https://mohmmedlaeh81.atlassian.net/jira/software/c/projects/WM/list?atlOrigin=eyJpIjoiOWE0ZWI0ZjZlOTgzNGY4Zjg0OTNlN2NlNWU5YTE0OTciLCJwIjoiaiJ9t) [Lien vers le projet Jira](https://mohmmedlaeh81.atlassian.net/jira/software/c/projects/WM/list?atlOrigin=eyJpIjoiOWE0ZWI0ZjZlOTgzNGY4Zjg0OTNlN2NlNWU5YTE0OTciLCJwIjoiaiJ9t)

## 🚀 Features

- 📸 *Intégration du Scanner de Codes-Barres * - Recherche et enregistrement instantanés des produits
- 📊 *Suivi des Stocks en Temps Réel * - Surveillance en direct des niveaux de stock
- 📈 *Rapports Avancés* - Generate stock reports
- 🔍 *Recherche de Produits * - Recherche instantanée avec filtres multiples
- 📦 *Gestion des Lots* - Suivi des lots de produits et des dates d’expiration
- 📱 *Design Mobile-first* - Optimisé pour une utilisation sur tablette en entrepôt
- 🔄 * Synchronisation Hors Ligne* - Travail sans connexion internet
- 🛡 * Historique des Modifications * - Traçabilité complète des changements d’inventaire


## 📦 Tech Stack

*Frontend*  
[![React Native](https://img.shields.io/badge/-React%20Native-61DAFB?logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/-Expo-000020?logo=expo&logoColor=white)](https://expo.io/)
[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

*expo router*  
[![Expo Router](https://img.shields.io/badge/-expo_router-6B52AE)](https://exporouter.org/)

*nativeWind*  
[![React Native Paper](https://img.shields.io/badge/-native%20Nativ-2089DC)](https://reactnativepaper.com/)

*State Management*  
[![Context API](https://img.shields.io/badge/-redux%20toolkit-61DAFB?logo=react&logoColor=white)](https://reactjs.org/docs/context.html)

*Backend*  
[![JSON Server](https://img.shields.io/badge/-JSON%20Server-000000?logo=json&logoColor=white)](https://github.com/typicode/json-server)

## ⚙ Installation


1. *Clone le dépôt* :

    ```bash
       git clone https://github.com/mohmmedlahlali20/Warehouse_Management.git

    ```

2. *Environment Setup*:

    ```bash
    cd Warehouse_Management
     Create .env file with configuration
     EXPO_PUBLIC_API=
    ```

3. Run Application :

    ```bash
        npx expo start
    ```


    ### Dépendances & devDépendances :
```json
"dependencies": {
 "@expo/vector-icons": "^14.0.2",
    "@react-native-async-storage/async-storage": "^2.1.1",
    "@react-native-picker/picker": "^2.11.0",
    "@react-navigation/native": "^7.0.3",
    "@reduxjs/toolkit": "^2.5.1",
    "expo": "^52.0.31",
    "expo-barcode-scanner": "^13.0.1",
    "expo-camera": "~16.0.16",
    "expo-constants": "~17.0.5",
    "expo-linking": "~7.0.5",
    "expo-print": "~14.0.3",
    "expo-router": "~4.0.6",
    "expo-sharing": "~13.0.1",
    "expo-status-bar": "~2.0.1",
    "expo-system-ui": "~4.0.8",
    "expo-web-browser": "~14.0.2",
    "jest": "~29.7.0",
    "nanoid": "^5.0.9",
    "nativewind": "latest",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-native": "0.76.7",
    "react-native-gesture-handler": "~2.20.2",
    "react-native-maps": "1.18.0",
    "react-native-paper": "^5.13.1",
    "react-native-reanimated": "3.16.2",
    "react-native-safe-area-context": "4.12.0",
    "react-native-screens": "~4.4.0",
    "react-native-web": "~0.19.10",
    "react-redux": "^9.2.0"
}
```

```json

"Devdependencies": {
 "@expo/vector-icons": "^14.0.2",
     "@babel/core": "^7.20.0",
    "@types/jest": "^29.5.14",
    "@types/react": "~18.3.12",
    "@typescript-eslint/eslint-plugin": "^7.7.0",
    "@typescript-eslint/parser": "^7.7.0",
    "eslint": "^8.57.0",
    "eslint-config-universe": "^12.0.1",
    "jest-expo": "^52.0.4",
    "prettier": "^3.2.5",
    "prettier-plugin-tailwindcss": "^0.5.11",
    "tailwindcss": "^3.4.0",
    "typescript": "~5.3.3"
}
```