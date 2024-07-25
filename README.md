# Chess Game Project

Welcome to our Chess Game Project! This game is designed to offer an engaging way to learn coding and game development basics using JavaScript, HTML, and CSS. It's perfect for beginners who want to dive into the exciting world of web development.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup and Installation](#setup-and-installation)
5. [How to Play](#how-to-play)
6. [Project Structure](#project-structure)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction

This project showcases a fully functional chess game where players can drag and drop pieces to make their moves. It not only provides a great way to practice your coding skills but also offers a fun and interactive experience.

## Features

- **Drag-and-drop functionality** for chess pieces.
- **Enforcement of chess rules** ensuring valid moves.
- **Visual feedback** for invalid moves.
- **Blitz-style gameplay** with a move timer and life points system.
- **Start and restart buttons** for game control.
- **Automatic win detection** based on capture of the king or life points.

## Technologies Used

- **HTML**: Markup for the game structure.
- **CSS**: Styling for a visually appealing game interface.
- **JavaScript**: Logic for game functionality and interactivity.

## Setup and Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. **Checkout the `develop` branch:**

    ```bash
    git checkout develop
    ```

3. **Open the `index.html` file in a live server:**

    - You can use the Live Server extension in VSCode to open `index.html`.

4. **Start playing the game!**

## How to Play

1. Open the `index.html` file in your browser.
2. The game board will be displayed in the center of the screen.
3. It's Purple's turn to start. Drag and drop pieces to make your move.
4. The game will enforce valid moves and display messages for invalid moves.
5. Use the move timer wisely – every 9 seconds without a move deducts 7 life points.
6. Each player starts with 100 life points. Capture pieces to reduce your opponent's life points.
7. The game ends when a king is captured or a player’s life points reach zero.

## Project Structure

```plaintext
├── app.js            # Main JavaScript file
├── pieces.js         # JavaScript file containing SVGs of chess pieces
├── styles.css        # CSS file for styling the game
├── index.html        # HTML file for the game
└── README.md         # This file

## Contributions
If you would like to contribute to this project, please follow these steps:

Fork the repository.
Create a new feature branch (git checkout -b feature-name).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature-name).
Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
