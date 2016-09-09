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


##From JS to Scala

##In-depth example

##Sample repo and testing
