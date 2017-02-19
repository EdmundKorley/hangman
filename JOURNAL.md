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

The _Drawing_, _Keyboard_, and _Settings_ components should definitely have a UI layer / view where _Words_ is more of a service and _Hangman_ weaves all the components together to implement a game. Note that the API interface would be as declarative as shown above due to the one-way data binding of React. There are two approaches that come to mind when tackling this. We could start from the top-down, trying to implement the heavy Hangman component first and then tackling the smaller discrete components afterwards. Or with a bottom-up approach, we could start with the discrete independent components (Drawing, Keyboard, Words, Settings) first.

I'm leaning towards a bottom-up approach, as it will be easier to test these discrete components as we move along. Before moving on, I want to do a bit of research on if I'm missing anything with these OOP-driven design for a hangman game.

Another set of views and components I need, the *Keys*, which will display the current keys correctly guessed and underscores for the keys to be guessed, and the *Status*, which will display information about the current session such as incorrect guesses made, guesses left, record, and so on.

React seems like a perfect fit for the compartmentalizing of our components. React components can help organize the separation of concerns we stipulated earlier.

With something as simple as this, let's avoid the overhead of Webpack and just load the React libraries from a CDN. Plus there is a probability they will be loaded from a browser's cache given the prevalence of React on the web. Let's see if I can get Babel included as well from a CDN as well so we can write ES6/ES7. Although I'm not sure if you can transpile JavaScript on the client-side, as polyfills may not be enough to implement all the ES6/ES7 features. Interesting, it turns out you can and it is in fact what sites like CodePen and JSFiddle use to turn user-provided ES6/ES7 into browser-complaint ES5. It looks like the `text/babel` and `text/jsx` tags is what lets Babel on the client-side know what to transpile so if you included such a tag with unsupported ES6/ES7 before including Babel from a CDN then it would fail. Perfect, got everything running from a CDN.

While on the topic of tooling, I wonder if there is a way to automatically include all JavaScript files in a folder from a single script tag - trying to mimic the bundling behavior of Webpack on the client side. It seems like it would be too much work and little value added to do that from the client side and would be much easier from the server side. I want to be able to host this on GitHub Pages for free so  I don't have much control on the server side.

Regardless, I feel good about the overall design and approach for this Hangman game. Will probably tackle the Settings component first.

What are the configurable settings we need for the game? The **difficulty** should correlate to the difficulty settings for the /words API (1-10) so we can use a `<input type="number" min="1" max="10">` for this. As user manipulates these settings, they should not automatically refresh the current session with the new settings. The user should _opt-in_ into new settings with a conspicuous **refresh/reload button**.

Let's hold off on a configurable hangman for now. I may want to explore [CSS polygons]() (used to the wonderful animal depictions [here](http://species-in-pieces.com/#) and [here](http://interviewing.io/employers/)). It would be a challenge for me but I'd be up for it if I have time 😅. Actually lets put a placeholder of a set of radio buttons for now.

Got a very basic settings interface up, ready to go.

#### Why I'm not using a state management solution (Redux)

I want to accumulate the pains for managing state myself and try to understand if there could be a situation so simple where it doesn't bring value added. Also trying to keep dependencies at a minimum 😉. Freak it, lets take it up a notch and decide to use compartmentalized CSS Polygons of animals (🦁 and 🐊)! Then I would've have definitely learned something new from this.

In building our the Words service, tried using the promise-based fetch API to pull down the resource but got a `No 'Access-Control-Allow-Origin' header is present on the requested resource.` Ok so the server that /words API is sitting on doesn't enable CORS (cross-origin resource sharing). I'm not sure if this is an _intentional_ wrench in the problem but lets assume it is, how do I work past this? I can render the words resource as an HTML page with an iFrame. I then have to go in and parse out the words I'm interested. Should I just email and ask if CORS is disabled on that server by mistake? No, let's do it this way for now as switching back to a `fetch` oriented approach won't be that cumbersome if we have to do that. Shit no-CORS on the server-side is affecting the iFrame solution as well. Pick this up in the morning.

Ok, going with a build-time solution. I have some shell scripts that tap /words for the different levels into a .txt file and then a Python script follows up and parses these .txt files in a singular **words.json** file. This should suffice for now but the JSON file is huge (25 MB) so let's cache it in local storage to avoid excessively sending it to the client side. There is probably a more elegant solution to get around CORS and the browser's Same Origin Policy but lets go with this for now.

Stringified JSON exceeds localStorage quota, let's see if breaking the JSON up helps. Nope. Okay, so I know in fits in memory as I'm able to pull it down so let's just keep it there for now, and maybe invest in finding a CORS workaround or emailing them later. Got it working, but I really need to figure out how to get around CORS being turned off on the server as it will make our application more extensible.

Working on Drawing component. Due to the nature of React components, I'm not able to exactly obey the declarative API that I specified earlier. I will be spending down state that the Drawing component will there after render _apropros_. For example, I'm sending down the number of pieces to draw from <Handman /> into <Drawing /> to draw upon re-render. I will built out the crocodile svg then move on to <Keyboard />. <Keyboard /> was relatively light work, on to the <Keys /> component. <Keys /> was also relatively light, working bottom-up seems easy at first but we will see whether optimizing the parent <Hangman /> holds any bottlenecks or accumulation of errors I made on the smaller components.
