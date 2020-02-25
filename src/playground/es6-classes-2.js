//es6 classes examples continued

//class Person{
//    constructor(name='not defined', age=0){
//        this.name=name;
//        this.age=age;
//        
//    }
//    
//    getDesc(){
//        return `i am ${this.name} and my age is ${this.age}`;
//    }
//    
//    
//}
//
//class Student extends Person{
//  constructor(name,age,major){
//    super(name,age);
//    this.major=major;
//  }
//  
//  getQuali(){
//    return `i am ${this.name} and i have a ${this.major} from NIEIT`;
//    
//  }
//  
//  
//}
//
//const me=new Person('marc',26);
//console.log(me.getDesc());
//
//const me2=new Student('nag',26,'IS')
//console.log(me2.getQuali());


//method overriding in child class

//class Person{
//    constructor(name='not defined', age=0){
//        this.name=name;
//        this.age=age;
//        
//    }
//    
//    getDesc(){
//        return `i am ${this.name} and my age is ${this.age}`;
//    }
//    
//    
//}
//
//class Student extends Person{
//  constructor(name,age,major){
//    super(name,age);
//    this.major=major;
//  }
//  
//  getQuali(){
//    return `i am ${this.name} and i have a ${this.major} from NIEIT`;
//    
//  }
//  
//  getDesc(){
//    return `testing`;
//  }
//  
//  
//}
//
//const me=new Student('marc',26);
//console.log(me.getDesc());



//method overrrind and some extra in child class

//class Person{
//    constructor(name='not defined', age=0){
//        this.name=name;
//        this.age=age;
//        
//    }
//    
//    getDesc(){
//        return `i am ${this.name} and my age is ${this.age}`;
//    }
//    
//    
//}
//
//class Student extends Person{
//  constructor(name,age,major){
//    super(name,age);
//    this.major=major;
//  }
//  
//  getQuali(){
//    return `i am ${this.name} and i have a ${this.major} from NIEIT`;
//    
//  }
//  
//  hasMajor(){
//    return !!this.major; //return true or false boolean value by double negating it, double negate simply converts truthy/falsy values to booelan true or false 
//    //console.log (typeof !!this.major);
//  }
//  
//  getDesc(){
//    //return `testing`;
//    let parentDesc=super.getDesc();//accessing parent desc by using super
//    //return parentDesc;
//    
//    if(this.hasMajor()){ //checking the value of 
//      parentDesc+=` and i have a major in ${this.major}`;
//    }
//    
//   return parentDesc;
//    
//  }
//  
//  
//}
//
//const me=new Student('marc',26,'IS');
//console.log(me.getDesc());//i am marc and my age is 26 and i have a major in IS
//
//const me2=new Student()
//console.log(me2.getDesc());//i am not defined and my age is 0



//CHALLENGE

class Person{
    constructor(name='anonymous', age=0){
        this.name=name;
        this.age=age;
        
    }
    
    getGreeting(){
      
      return `Hi, ${this.name}`;
    }
  
    getDesc(){
        return `i am ${this.name} and my age is ${this.age}`;
    }
    
    
}

class Student extends Person{
  constructor(name,age,major){
    super(name,age);
    this.major=major;
  }
  
  getQuali(){
    return `i am ${this.name} and i have a ${this.major} from NIEIT`;
    
  }
  
  hasMajor(){
    return !!this.major;
    //console.log (typeof !!this.major);
  }
  
  getDesc(){
    //return `testing`;
    let parentDesc=super.getDesc();//accessing parent desc by using super
    //return parentDesc;
    
    if(this.hasMajor()){
      parentDesc+=` and i have a major in ${this.major}`;
    }
    
   return parentDesc
    
  }
  
  
}

class Traveler extends Person{
  constructor(name,age,location){
    super(name,age);
    this.location=location;
  }
  
  //getLocation(){
 //   return !!this.location;
 // }
  
  getGreeting(){
    let greet=super.getGreeting();
    
    if(this.location){ //if truthy value
      greet+=` and i am from ${this.location}`;
    }
    
    return greet;
  }
  
}

//const me=new Student('marc',26,'IS');
//console.log(me.getDesc());

//const me2=new Student();
//console.log(me2.getDesc());

const me3=new Traveler('dovi',32,'Italy');
console.log(me3.getGreeting());

const me4=new Traveler();
console.log(me4.getGreeting());