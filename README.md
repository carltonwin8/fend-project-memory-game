# Memory Game Project

This repository code is for a project/assignment in the
[Udacity Front-End Web Developer Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001).
The code is forked from the original repository
[here](https://github.com/udacity/fend-project-memory-game)
where some more details are provided.

In order to run this code, clone or download this repository and open
`index.html` in a web browser.
An Internet connection is required as icons and fonts used in the application
are downloaded from the Internet.

The `index.html` file is dependent on the following.
  - [Google Fonts](https://fonts.googleapis.com/css?family=Coda"),
  - [Font Awesome Icons/Fonts](https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"),
  - `css/app.css` - the CSS style file in this repository,
  - `js/app.js` - the JavaScript file in this repository.

Play the game by:
  - clicking on a square to reveal the hidden icon,
  - only two icons will be revealed at a time,
  - the goal is to consecutively reveal two matching icons,
  - when two consecutive card are revealed and they match they remain open,
  - the game ends when all the hidden squares are  revealed,
  - the user score and time to complete the game is shown,
  - the user gets 1, 2 or 3 stars:
    - 3 stars for finishing the game in 8 moves or less
    - 2 stars for finishing the game in 9-12 moves inclusive
    - 1 star for finishing the game in 13 or more moves
