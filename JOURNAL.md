Tue Feb 14 09:48:27 2017

This is a fun idea, right off the bat I'm interested in building a web interface for this and have all the game logic on the client side, using local storage for persistance. Afterwards, I could use something simple like [Firebase](https://firebase.google.com) to implement leaderboards and caching for the requests to the /words API.

How do we abstract away the main components of this game?

- *Drawing* - the pictorial representation of the hangman. We can use SVG to represent a collection of separate drawings.
	- `Drawing(config)` - initialized with an optional configurable object for the properties of the hangman, such as gender, style, etc.
	- `drawNext()` - draws next piece of hangman in order.
	- `refresh(config)` - reinitialize the hangman with new optional configuration.
	- `isFull()` - checks whether all pieces of hangman have been draw.

- *Keyboard* - representing the universe of alphabetic keys and the user's interaction with those keys.
	- `Keyboard(charset)` - initialized with a default character alphabetic set.
	- `registerDelegate()` - a delegate method for when a user keystroke or user clicks on visible key event happens. Will call a `userKeyed(key)` method on the delegate.

- *Words* - get relevant words to use in the hangman game.
	- `Words(store)` - store is the locale from which to fetch words.
	- `getWord(config)` - get a specific word from the /words API with a specified configuration, could implement the necessary caching needed to avoid extra requests.

- *Settings* - an object for the global configuration settings of the current game: difficulty, hangman styles, minLength, maxLength, numOfGuesses=6, etc.

- *Hangman* - the containerized game logic that weaves the previous components together to implement a fully functional hangman game.

The _Drawing_, _Keyboard_, and _Settings_ components should definitely have a UI layer / view where _Words_ is more of a service and _Hangman_ weaves all the components together to implement a game. There are two approaches that come to mind when tackling this. We could start from the top-down, trying to implement the heavy Hangman component first and then tackling the smaller discrete components afterwards. Or with a bottom-up approach, we could start with the discrete independent components (Drawing, Keyboard, Words, Settings) first.

I'm leaning towards a bottom-up approach, as it will be easier to test these discrete components as we move along. Before moving on, I want to do a bit of research on if I'm missing anything with these OOP-driven design for a hangman game.

Another set of views and components I need, the *Keys*, which will display the current keys correctly guessed and underscores for the keys to be guessed, and the *Status*, which will display information about the current session such as incorrect guesses made, guesses left, record, and so on.

Tue Feb 14 10:21:13 2017

React seems like a perfect fit for the compartmentalizing of our components. React components can help organize the separation of concerns we stipulated earlier.

With something as simple as this, let's avoid the overhead of Webpack and just load the React libraries from a CDN. Plus there is a probability they will be loaded from a browser's cache given the prevalence of React on the web. Let's see if I can get Babel included as well from a CDN as well so we can write ES6/ES7. Although I'm not sure if you can transpile JavaScript on the client-side, as polyfills may not be enough to implement all the ES6/ES7 features. Interesting, it turns out you can and it is in fact what sites like CodePen and JSFiddle use to turn user-provided ES6/ES7 into browser-complaint ES5. It looks like the `text/babel` and `text/jsx` tags is what lets Babel on the client-side know what to transpile so if you included such a tag with unsupported ES6/ES7 before including Babel from a CDN then it would fail. Perfect, got everything running from a CDN.

While on the topic of tooling, I wonder if there is a way to automatically include all JavaScript files in a folder from a single script tag - trying to mimic the bundling behavior of Webpack on the client side. It seems like it would be too much work and little value added to do that from the client side and would be much easier from the server side. I want to be able to host this on GitHub Pages for free so  I don't have much control on the server side.

Regardless, I feel good about the overall design and approach for this Hangman game. Will probably tackle the Settings component first.
