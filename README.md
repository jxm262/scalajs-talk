# Scala.js - Typesafe code for your front end

##Why use it
Scala.js is simply a compliler from Scala to JavaScript; bringing the power of strong typing to the front-end.  But why do we want stronger typing in JavaScript?  For many, the Scala type system increases code quality and enhances understandibility.  Placing constraints on your system helps reduce programmer error, allows for easier refactoring, and gives more assurance that parts of the code will behave correctly.  Letting the compiler do the work of proving my system allows me to focus more on the business logic.  This idea isn't revolutionary, TypeScript, PureScript, etc. try to provide this, but the beauty of Scala.js is that it brings all the awesomeness of Scala with it (collections, case statements, for-comprehensions, Options..)


##Simple demo and Interop
Scala.js code works by mapping Scala types to their corresponding JavaScript types.  Most of these work well right out of the box. For example - `String`, `Float`, `Null` all map over to their corresponding JS counterparts.  For the others, you can do simple conversions on them pretty easily.  The seamless interopability is a key feature of Scala.js.  

For example - 
```
//javascript
function squareNum(i) {
  return i*i;
}
squareNum(3)  //9

//scala.js
def squareNum(i: Int): Int = i*i
squareNum(3)  //9
```

When making an error, notice the immediate benefit of the Scala compiler
```
//javascript
squareNum("oops")  //9

//scala.js
squareNum("oops")  //compiler says NOOO!

<console>:13: error: type mismatch;
 found   : String("oops")
 required: Int
       squareNum("oops")
```

##From Scala to JS
To make Scala code available to JavaScript, we can export it with the `@JSExport` tag.  
```
package example

@JSExport 
object Car {
  val year: Int = 2007
  val make: String = "Honda"
} 

//can also make classes if you want to new something up with constructor params
@JSExport
class Car(@(JSExport @field) val year: Int,
          @(JSExport @field) val make: String)
```  
This allows us to call the exported code directly from JavaScript.  
```
var car = new example.Car(2007, "honda")
```

##From JS to Scala
More commonly, we want to write most (or all) of our application in Scala.  To use existing JavaScript libraries, we need to create a _Facade_ type, which is basically a typed definition of the JS code in Scala.  To do this, the underlying facade must extend a js.Any type (usually with js.Object).  This essentially tells the compiler it's now a js "type" and will try to match the name of the object to it's corresponding JS code.

```
//javascript code (something you've imported you want to work with in Scala)
var DemoJS = {
    hello: function(v) {
        return "hello " + v;
    },

    val: function() {

    },

    'hello property': "hello",

    mynum: 3
};

//scala.js facade

@js.native
trait DemoJS extends js.Object {
  def hello(v: String): String = js.native

  @JSName("val")
  def value(): Unit = js.native

  @JSBracketAccess
  def getHelloProperty(key: String): String = js.native

  @JSBracketAccess
  def setHelloProperty(key: String, value: String): Unit = js.native
}
object DemoJS extends DemoJS

DemoJS.hello("world")  //"hello world"
DemoJS.hello(3)        //compiler says NOOO!
```


##In-depth example
Now that we have a basic idea of how this all works, let's dive into a more complete example.  Here at Cibo I'm currently working on quite a bit of Data Visualization.  There's one particular maps library I've grown fond of called [Leaflet](http://leafletjs.com/reference-1.0.0.html).  There's quite a bit to this library, but the most basic part of it is the Map object which allows you to render things onto it.  Here's a small sample of the Leaflet API

+ `L.map(<String> id, <Map options> options?)`  
    - accepts a String representing a dom element ID, and an optional Map options object
+ `L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);`
    - accepts a String representing a basemap urlTemplate, and an options object.  
    - addTo method takes a map object to place the tileLayer object

We can facade this out like so
```
@JSName("L")
@js.native
object LeafletFacade extends js.Object {
  def map(id: String): Map = js.native
  def tileLayer(urlTemplate: String): TileLayer = js.native
}

//example usage
val leafletMap = LeafletFacade.map("leaflet-map")
val tileLayer = LeafletFacade
  .tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}")
  .addTo(leafletMap)
```

In this case, instead of having the scala.js compiler automatically try to map the name LeafletFacade to it's corresponding JS object (which doesn't exist under that name), I've added a `@JSName` tag to indicate where to connect it.  I can now map "L" (the Leaflet "L" reference) to any name I wish.  I've then added on the other 2 methods as `js.native` and can now call them from within my Scala code.  Notice again, this is now all type safe!  

###Cool Things and Gotcha's
Reading through the Scala.js docs, I was a bit confused on certain sections.  Particularly the blurb about Monkey Patching.  Yes, I know what monkey patching is, but the cited example didn't completely click for me until I really tried it myself.  Occassionally, you'll find yourself using some existing Facade library, where the underlying JS library allows you to extend onto it's Prototype (I'm looking at you jQuery).  

For example, we've imported the JQuery facade into our app and have code that looks like this - 
```
import org.scalajs.jquery.{jQuery}

val datePicker = jQuery("#date-picker")
```

But, what if we want to use another jQuery extension library, say the jQueryUI [DatePicker widget](https://api.jqueryui.com/datepicker/#entry-examples), and need to write a facade for that.  For example you want to _extend_ the jQuery prototype and add another function onto the JS library _which has already been facaded_.  You could facade out jQueryUI in your own code, and include a method on it, but then to use the original jQuery code, you'd have to refacade all of the original jQuery code yourself as well and not be able to reuse the library.  How can we just extend onto the initial library in a typesafe way?

An easy method is to wrap the library with an implicit like so -
```
trait JQueryUI extends JQuery {
  def datepicker(): this.type = ???
}

object JQueryUI {
  implicit def jQueryUIExtensions(query: JQuery): JQueryUI =
    query.asInstanceOf[JQueryUI]
```

Now we can do this.  Note we can call jQuery just as before but it now has `datepicker` function attached to it.  The JQueryUI library extended this method onto the prototype and we've now wrapped someone else's facade into our own Type!  
```
import org.scalajs.jquery.{jQuery}

import JQueryUI._
val datePicker = jQuery("#date-picker").datepicker()
```

One gotcha to note is that while we're able to Facade out a library that has extended some other Facaded library's Prototype, we can't update the prototype directly ourselves in a type safe way.

For example, in our previous Leaflet example, let's say we want to add a `createTile` method onto the `GridLayer` prototype.  The [GridLayer docs](http://leafletjs.com/reference-1.0.0.html#gridlayer) show an example of this, where they use a helper function `extend` allowing you to mixin an object into the prototype.  

So how can we convert this functionality below into Scala.js? 
```
var CanvasLayer = L.GridLayer.extend({
    createTile: function(coords){
        // create a <canvas> element for drawing
        var tile = L.DomUtil.create('canvas', 'leaflet-tile');
        // setup tile width and height according to the options
        var size = this.getTileSize();
        tile.width = size.x;
        tile.height = size.y;
        // get a canvas context and draw something on it using coords.x, coords.y and coords.z
        var ctx = tile.getContext('2d');
        // return the tile so it can be rendered on screen
        return tile;
    }
});
``` 

Without creating your own actual JavaScript code and facading that, the only way is to actually make the GridLayer a js.Dynamic type and adding your method onto it.  
```
val canvasLayer = L.gridLayer()
canvasLayer.asInstanceOf[js.Dynamic].createTile = () => {
  val canvas = dom.document.createElement("canvas").asInstanceOf[Canvas]
  val ctx = canvas.getContext("2d").asInstanceOf[dom.CanvasRenderingContext2D]
  canvas.width = 50
  canvas.height = 50
  ctx.fillStyle = "white"
  ctx.strokeStyle = "red"
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(255, 0)
  ctx.lineTo(255, 255)
  ctx.lineTo(0, 255)
  ctx.closePath()
  ctx.stroke()
  canvas
}
```
Notice we've declared assigned a GridLayer to a canvasLayer, converted it to js.Dynamic type, and added a method onto it.  This gets compiled down to the gridlayer object, but with the extra creatTile method attached.  It works, but converting to js.Dynamic negates the awesome power of type safety.  

