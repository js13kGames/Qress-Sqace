# js13k-2021-press-space

## Description:

I wanted to combine three games I like:

-   Tyrian, a classic 2D rolling shooter
-   ZType, a game that is played by typing words
-   Taiko no Tatsujin, a rhythm game

My goal was to made a simple, short, but challenging game.

How to play:

-   There is a music playing and you can see the notes "flying" from top to bottom. Notes can appear in 4 columns. Notes comes in a group of 4 or 5 and they form a word that can be written on the left side of the keyboard.
-   When the note hits the white bar, your left hand should press the key that matches to the "note letter".
-   Your right hand holds mouse or uses trackpad to control a spaceship.

Some more notes:

-   The green bars have no use. They just visualize the snare "drum" so you can be in rhythm easier.
-   The game screen is 1000px tall. If you play on a smaller screen, go full screen.
-   The words are taken from a dictionary and were filtered to contain only words that you can write with right hand. If the words make an inappropriate sentence, it's just a random occurrence.

Levels and score:

-   You can choose the level of difficulty at the start. It differs only in tempo speed.
-   The goal of the game is to hit 90% of the notes.
-   Score is calculated from the difference when each note should play and when the key was hit.
-   If you fail to meet the goal, the song is played again and the words are not regenerated so you can memorize it and make it easier. Each time the song is played, the lesser your score will be.

TODOS and lessons learned:

-   this game is much easier for right-handed people, make a left-handed version too
-   typescript is good
