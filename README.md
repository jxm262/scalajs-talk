# Scala.js - Typesafe code for your front end

##Why use it
Scala.js is simply a compliler from Scala to JavaScript; bringing the power of strong typing to the front-end.  But why do we want stronger typing in JavaScript?  For many, the Scala type system increases code quality and enhances understandibility.  Placing constraints on your system helps reduce programmer error, allows for easier refactoring, and gives more assurance that parts of the code will behave correctly.  Letting the compiler do the work of proving my system allows me to focus more on the business logic.  This idea isn't revolutionary, TypeScript, PureScript, etc. try to provide this, but the beauty of Scala.js is that it brings all the awesomeness of Scala with it (collections, case statements, for-comprehensions, Options..)


##Simple demo and Interop
Scala.js code works by mapping Scala types to their corresponding JavaScript types.  Most of these work well right out of the box. For example - `String`, `Float`, `Null` all map over to their corresponding JS counterparts.  For the others, you can do simple conversions on them pretty easily.  The seamless interopability is a key feature of Scala.js.  

For example - 
```
todo...
```

When making an error, notice the immediate benefit of the Scala compiler
```
example
```

##From Scala to JS
To make Scala code available to JavaScript, we can export it with the `@JSExport` tag.  
```
example
```
  
This allows us to call the exported code directly from JavaScript.  


##From JS to Scala
More commonly, we want to write most (or all) of our application in Scala.  To use existing JavaScript libraries, we need to create a _Facade_ type, which is basically a typed definition of the JS code in Scala.  To do this, the underlying facade must extend a js.Any type (usually with js.Object).  This essentially tells the compiler it's now a js "type" and will try to match the name of the object to it's corresponding JS code.

```
simple example
```


##In-depth example
Now that we have a basic idea of how this all works, let's dive into a more complete example.

```
complex Leaflet example
```

###Gotcha's and confusing parts
Reading through the Scala.js docs, I was a bit confused on certain sections.  Particularly the blurb about Monkey Patching.  Yes, I know what monkey patching is, but the cited example didn't completely click for me until I really tried it myself.  Occassionally, you'll find yourself using some existing Facade library, where the underlying JS library allows you to extend onto it's Prototype (I'm looking at you jQuery).  For example, we've imported the JQuery facade into our app and have code that looks like this - 
```
...
```

But, what if we want to use another jQuery extension library, say jQueryUI, and need to write a facade for that.  


##Sample repo and testing
