# UniTrack

A student productivity app built to track university courses, assignments, and lecture recordings in one place. Built with React Native, Expo, and TypeScript.

---

## Why I Built This

I've noticed I'm having a hard time keeping track of my university assignments and tasks, and I used several existing apps none of which had all the features I wanted. And so I thought: 'Why not build one myself? It could be a fun project for the semester break'.

Coming into this project with no prior JavaScript or TypeScript background, I took a TypeScript course on Udemy to learn the basics, then dove straight into building the app. The main focus of this project was learning application logic, state management, and project structure. The styling was generated with the help of AI tools to save time and keep the focus on code and functionality.

---

## What It Does

- Tracks active courses and basic course info.
- Manages assignments and deadlines.
- Tracks remaining lecture recordings and watch time.
- Works offline with local state persistence (Redux Persist). No server required.
- Push notifications 24 hours before deadline.

---

## Tech Stack

- React Native (Expo)
- TypeScript
- Redux Toolkit & Redux Persist
- React Native Reanimated
- Expo Notifications

---

## Installation (Android)

Note: The app is currently available for Android only.

1. Download the APK file from the [Releases](https://github.com/GuyZehavi/UniTrack/releases) section to your Android device.
2. Open the file and tap Install.
3. If Android shows a warning about an unknown source/unverified app:
   - Tap "More details".
   - Tap "Install anyway".

---

## Running Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/GuyZehavi/UniTrack.git
   cd UniTrack
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npx expo start
   ```
