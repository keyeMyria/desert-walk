# Desert Walk

A game of solitare implemented in React Native and written in TypeScript.

Published through Expo: <https://expo.io/@janaagaard75/desert-walk>.

## Running the App Locally

1. Fetch the repo and install packages with `yarn install` (or `npm install`).
1. Download and install the [Expo XDE](https://expo.io/tools).
1. (Not sure if this is mandatory: Install XCode on Mac. The iOS Simulator is part of XCode.)
1. Open the project in Expo XDE. This should compile everyting.
1. Open the project in the iOS simulator* or...
1. ... Install the Expo client on a mobile device and scan the QR code revealed by the Share button.

*) It also possible to run the app in Android simulator, but I haven't tried that yet.

## TODO

* Animate the cards when they are delt.
* Game lost screen.
* Game won screen.
  * Some kind of reward for winning. Could be showing a fast replay of all the moves. Also see below.
* Small animation when a card is moved into the correct position. Could be a small shine effect like the one on records in the Moves app. Pixel art example: <https://i.imgur.com/oLmT5Ot.gif>.
  * Animate all cards when the game is won. Also see above.
* SVGs for the numbers or a custom fonts, to make sure it looks correct on Android too.
* Consider letting MobX handle the full state, including local states.
* More affordable buttons.
* Limit the number of shuffles. An intuitive UI is important. Might be done with showing a number of buttons that become disabled when they are used.
* Splash screen.
* Fix starting up the game while the phone is in landscape mode.
* Remember game state when the Expo app has been closed for a long time.

## Logo

[Free Arabic lookings fonts](http://www.dafont.com/theme.php?cat=202&text=Desert+Walk+1234567890+AKQJ&l[]=10&l[]=1). Top candidates:

* [Tafakur](http://www.dafont.com/tafakur.font?text=Desert+Walk+A+2+3+4+5+6+7+8+9+10+K+Q+J&fpp=100&l[]=10&l[]=1)
* [Nurkholis](http://www.dafont.com/nurkholis.font?text=Desert+Walk+A+2+3+4+5+6+7+8+9+10+K+Q+J&fpp=100&l[]=10&l[]=1)
* [Aceh Darusalam](http://www.dafont.com/aceh-darusalam.font?text=Desert+Walk+A+2+3+4+5+6+7+8+9+10+K+Q+J&fpp=100&l[]=10&l[]=1)
* [XXII Arabian Onenightstand](http://www.dafont.com/xxii-arabian-onenightstand.font?text=Desert+Walk+A+2+3+4+5+6+7+8+9+10+J+Q+K)

## Learnings

Adding undo/redo and the subsequent cleanup of the datamodel was difficult. Having switched to a primarely @computed based model is nice, but there are probably still leftovers for the previous code, meaning that the currently solution could be simplified and optimized.

TypeScript is nice, but it doesn't catch all errors. Specifically there are apparently no compiler errors when checking if two different classes are equal, even though the result will always be false.

Having singleton classes (Game, Settings, Deck and Grid) is essentially the same as making every component a connected component, and that means that the cleanness of having pure components that only depend on their props is gone. The singleton classes also makes is harder to spot if the model is on the right track, since having a lot of the model globally avaiable easily leads to spaghetti code.

Creating a good model is difficult. It might be a good idea to move the dragged card from Game to GridState.

Naming things is hard, but important. Card has been renamed at least five times, and it still needs a rename, since it focuses on the cards and not the ceels. Perhaps going back to PositionedCard? When a class is renamed, there are often local variables left, that should also be renamed. Card and EmptyCell makes for a great pair, but the two classes are distinct in that when switching between states, the cards are all the same only moved, whereas the empty cells are removed and added.

The first data architechture was to only keep the information necessary for the rules of the game in the models, and leave all that has to do with presentation of the game to the view classes. That got messy, so the new architechture is to put pretty much everything in the models. Most of the properties are computed values. Making Settings, Game, Deck and Grid singletons has lead to somewhat a spaghetti code architechture, but currently it's okay. That might actually be the force of MobX: Embrace the spaghetti architecture, and avoid drowning in it.

Right now the models are separated from the views, but this actually not be a good idea where there is a one-to-one relation between model and view, as with for example the cards.

It is probably wize to go all in on MobX and remove all setState calls from the application.

## Links

<https://blog.cloudboost.io/3-reasons-why-i-stopped-using-react-setstate-ab73fc67a42e>