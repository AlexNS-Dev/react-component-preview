# React Component Preview
This project is an interactive webpage that allows users to write code in React and CSS in two separate editors. Once the code is written, you can render the preview to see the final result reflected live.

## Features
React Code Editor:
![React Code Editor Screenshot](./public/screenshots/react_editor.png)\
*Here you can create a React component using the code editor. There is also support for using the React hooks **useState** & **useEffect**.*

CSS Code Editor:
![CSS Editor Screenshot](./public/screenshots/css_editor.png)\
*In this editor instead you will style your component previously written in the code editor.*

Live Preview:
![Live Preview Screenshot](./public/screenshots/live_preview.png)\
*In the Live Preview you will be able to see the combination of the component plus the styles you have given to your component. This feature can be used either by clicking on the **Run** button on top of the Preview section or by using the key combination **Ctrl + Enter**.*

## Technologies Used
* **React:** The main framework for building the component logic.
* **Vite:** A fast build tool used to bundle and serve the project.
* **Ace Editor:** Integrated code editors for an interactive coding experience.
* **HTML5 and CSS3:** As the foundation for the page structure and general styles.
* **GitHub Pages:** For deploying the project online.

## Installation and Setup
1. Clone the repository
```
git clone https://github.com/AlexNS-Dev/react-component-preview.git
```
2. Install dependencies
```
cd react-component-preview
npm install
```
3. Start the Local Server
```
npm run dev
```

## How to Use the Application
1. **Write React Code:** Write the React component code in the provided editor.
2. **Write CSS Code:** Add CSS styles in the corresponding editor.
3. **Render:** Click the **Run** button or use the key combination **Ctrl + Enter** to update the preview section with your changes.

## Deployment
This project is deployed using GitHub Pages. You can visit the live version at [React Component Preview](https://alexns-dev.github.io/react-code-editor-preview/)
