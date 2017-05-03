var DemoJS = {
    hello: function(v) {
        return "hello " + v;
    },

    val: function() {

    },

    'hello property': "hello",

    mynum: 3
};

function DemoClass(name) {
    this.name = name
}

//be careful doing this
DemoClass.prototype.changeName = function(name) {
    this.name = name;
    return this;
};



function Shape(x, y) {
    this.x= x;
    this.y= y;
    this.hello = function(a) {
        return "from original " + a
    }
}

Shape.prototype.toString= function() {
    return 'Shape at '+this.x+', '+this.y;
};


//jQuery.fn.extend({
//  newMethod: function(value) {
//    return "newMethod - " + value;
//  }
//});

//function CaretControl() {
//}
//CaretControl.prototype.hello = function(s) {
//    console.log("s00- " + s);
//}

var CaretControl = {
    hello: function(v) { console.log(v) }
}
