# 🌍 GeoChain

GeoChain is an interactive, browser-based geography puzzle game. The objective is simple: connect a "Start" country to an "End" country by guessing the shortest continuous path of land borders between them.

![GeoChain Gameplay](link-to-a-screenshot-of-your-game.png)

## 🎮 Play the Game
[**Play GeoChain Live Here**](your-vercel-deployment-link-will-go-here)

## ✨ Features
*   **7 Hand-Crafted Levels:** Ranging from easy 1-step connections (Mexico → Canada) to difficult 7-step cross-continental journeys.
*   **Dynamic Map Rendering:** Powered by `react-simple-maps` and TopoJSON, the map dynamically highlights your correct guesses and tracks your progress.
*   **Smart Auto-Complete:** A custom-built dropdown ensures users don't fail due to typos or capitalization errors.
*   **Polished UI/UX:** Features a sleek Dark/Light mode toggle, Framer Motion modal animations, and celebratory confetti upon winning.
*   **Fully Responsive:** Optimized for both desktop and mobile web experiences.

## 🛠️ Tech Stack
*   **Framework:** Next.js (React)
*   **Styling:** Tailwind CSS
*   **Map Rendering:** `react-simple-maps` (D3-geo) & TopoJSON
*   **Animations:** `framer-motion` & `react-confetti`
*   **Deployment:** Vercel

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/geochain-game.git
   ```
2. Navigate into the directory:
   ```bash
   cd geochain-game
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧠 Product Strategy & Design Choices
As a Product Manager, I designed GeoChain to act as a highly engaging MVP. 
*   **Geographic Funnels:** To prevent the game from breaking when users find "shortcuts," levels were designed around geographic funnels (e.g., Central America) where only one valid path exists.
*   **Frictionless UX:** The auto-complete dropdown was prioritized to eliminate user frustration caused by strict string-matching requirements in the game logic.
