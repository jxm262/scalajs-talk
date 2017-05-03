# Scala.js - A deep dive into using JavaScript in a type safe way.

## Info
This is my Scala.js presentation given at various meetups.  Slides for the actual talk are in [the powerpoint file](https://github.com/jxm262/scalajs-talk/blob/master/Scalajs-talk.pptx).  

## Demo
The example application is located under the `/demo` directory and may be compiled/run to highlight the features of Scala.js.  To run locally - 
1. clone the repo and navigate to /demo 
2. run `sbt fastOptJS` to compile scala.js to javascript
3. open index.html in a browser , will show the resulting application


### Abstract
As web development continues to grow in complexity, developers are looking for ways to make their code more robust, safe, and easier to work with.  Using Scala.js, developers are now able to work on front end code in a type safe way and with all the rich features of the Scala language. However, getting productive in Scala.js requires more than what you can find online.  During the presentation, I will present lessons learned building early Scala.js apps at Cibo.  Go beyond the online documentation and blogs with an in-depth look of how to interop with and facade JavaScript code.

