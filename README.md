# Desert Walk

A game of solitare implemented in React Native and written in TypeScript.

Published through Expo: <https://expo.io/@janaagaard75/desert-walk>.

## To Do

* Update engine, so that it can animate the cards between two states.
  * When letting go of a card in a non-droppable place, let the engine snap the card back into position.
  * Use the engine to snap cards into correct positions.
  * Animate shuffling the cards.
  * Consider animating that the cards are delt. This will also maje it clearer what happens when the cards arw shuffled, and make it possible to show an animation, should the cards coincidally be redlet in the exact same position as they were before.
* Consider making the Game class a singleton, put Deck and Grid into it, and generally avoid passing things down with props, unless necessary.
* Game lost screen.
* Game won screen.
  * Some kine of reward for winning. Show a fast replay?
* Small animation when a card is moved into the correct position.
  * Animate cards before shuffleling?
  * Animate all cards when the game is won.
* Prettier background.
* SVGs for the playing cards, since iOS and Android have different fonts.
* Consider more data to the model objects, that is all observable properties and the sizes and positions of the elements.
* Disable shuffle button when it doesn't do anything.
* More affordable buttons.
* Splash screen.
* Fix starting up the game while the phone is in landscape mode.

## Fat Models

Keeping track of all the data is getting messing. The current architechture is to only keep the information necessary for the rules of the game, and leave all that has to do with presentation of the game in the view classes. It might be a better solution to move more information into the model, including what's required for drawing the interface, that is switch to an architechure with fat models.

The new architechture should support animating between two states, possibly shuffling multiple cards around, as they slide into their new positions. In the start and the end states the cards all have row and column indexes, but in between some of them are being animated. Keep the row and column index while the cards are animating, and update the cell positions once the animations are done.

### Dragging a Card

1. game.draggedCard points to the card.
1. The dragged card's position is updated as it's being dragged.
1. The game class keeps track of the position, updating empty cells if necessary.
1. The card is let go when overlapping a droppable spot.
1. The engine calculates the upcoming game state.
1. The engine slides the card into the exact spot by using the position of the upcoming state.
1. After the animation is done, the old state is swapped out with the new one, resulting in updated empty spots and so on.

### Logo

[Free Arabic lookings fonts](http://www.dafont.com/theme.php?cat=202&text=Desert+Walk+1234567890+AKQJ&l[]=10&l[]=1). Top candidates:

* [Tafakur](http://www.dafont.com/tafakur.font?text=Desert+Walk+A+2+3+4+5+6+7+8+9+10+K+Q+J&fpp=100&l[]=10&l[]=1)
* [Nurkholis](http://www.dafont.com/nurkholis.font?text=Desert+Walk+A+2+3+4+5+6+7+8+9+10+K+Q+J&fpp=100&l[]=10&l[]=1)
* [Aceh Darusalam](http://www.dafont.com/aceh-darusalam.font?text=Desert+Walk+A+2+3+4+5+6+7+8+9+10+K+Q+J&fpp=100&l[]=10&l[]=1)
* [XXII Arabian Onenightstand](http://www.dafont.com/xxii-arabian-onenightstand.font?text=Desert+Walk+A+2+3+4+5+6+7+8+9+10+J+Q+K)

## Links

<https://blog.cloudboost.io/3-reasons-why-i-stopped-using-react-setstate-ab73fc67a42e>