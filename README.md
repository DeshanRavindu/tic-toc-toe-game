# 🎯 Tic-Tac-Toe Game

A simple and interactive **Tic-Tac-Toe** game built using **React** ⚛️ and **Vite** ⚡, leveraging the `useState` hook to manage game state.

---

## ✨ Features

- 🖱️ Click a square to mark **X** or **O**, alternating turns.
- 🏆 Detects and displays the **winner** (X or O), or indicates a **draw**.
- ⏳ Tracks move history, allowing players to jump to previous game states.
- 🔄 Offers a **Reset** button to restart the game.

---

## 🛠 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DeshanRavindu/tic-toc-toe-game.git
   cd tic-toc-toe-game
2. Install dependencies:

    npm install

4. Start the development server:

----------------------------------------------------------------------------------------------------------------------------------

🎮 Usage

🖱 Click any empty square to mark.
🔄 The game automatically alternates between X and O.
🏆 When there's a winner or a draw, the game announces the result.
🔁 Use the Reset button to start a fresh game.
⏪ (If implemented) Jump back to previous moves via the move history list.

----------------------------------------------------------------------------------------------------------------------------------

##📂 Project Structure
  tic-toc-toe-game/
  ├── public/
  │   └── index.html
  ├── src/
  │   ├── assets/          # Images, styles, etc.
  │   ├── components/      # React components (Board, Square, Game, etc.)
  │   ├── App.jsx
  │   └── main.jsx
  ├── .gitignore
  ├── README.md
  ├── package.json
  ├── vite.config.js
  └── eslint.config.js

  ----------------------------------------------------------------------------------------------------------------------------------

##⚙️ State Management

This game uses React's useState hook for interactive behavior:

🎯 Board State – Maintains an array of nine squares (each representing a grid cell).
⏳ Move History – (If included) Stores previous board states for time-travel moves.
🔄 Current Player – Tracks whose turn it is (X or O), switching every move.
🏆 Winner/Draw Detection – Determines the game outcome after each move.

----------------------------------------------------------------------------------------------------------------------------------

##🛠 Built With

⚛️ React – UI library
⚡ Vite – Fast development & build tool
🖋 JavaScript, HTML, CSS
