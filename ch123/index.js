(function(){

    var MyMath = {
        abs: function (v) {
            return Math.abs(v);
        }
    }
    document.getElementById('board').innerHTML = MyMath.abs(-10);

    function Person (name, age) {
        'use strict';
        this.name = name;
        this.age = age;
    }
    Person.prototype.show = function() {
        alert("name: " + this.name + " age: " + this.age);
    }
    Person.type = "Person";
    alert(Object.getPrototypeOf(Object.prototype));
    var a = new Array();
    a[0] = 10;
    a[1] = 12;
    var p = new Person("Jim",10);
    var p2 = new Person("Jhon",20);
    p.show();
    p2.show();
    alert(Person.type);
    if( p instanceof Person) {
        alert('p is instance of Person');
    }
    

})();