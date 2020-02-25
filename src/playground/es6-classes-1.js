//es6 classes examples

/*class Person{
  constructor(name){
    this.name=name || 'default name'; // use default name when no name is given
  }
  
}
*/


class Person{
  constructor(name = 'anonymous', age=0){ //es6 way of givng default name when no name is given,& it can be anythng, boolean, integer, string etc
    this.name=name; 
    this.age=age;
  }
  getGreeting(){
    //return 'Hi, hello '+this.name+' wassup';
    return `Hi, i am ${this.name}`;
  }
  getDesc(){
    return `${this.name} is ${this.age} years old`;
  }
}

const me=new Person('nag',26);
console.log(me.getGreeting());
console.log(me.getDesc());

const other=new Person();
console.log(other.getGreeting());
console.log(other.getDesc());