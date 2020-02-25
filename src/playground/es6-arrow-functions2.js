//arrow functions2 

//arguments object - no longer bound with arrow functions

//before
function first(a,b){
  console.log(arguments); // prints pbject with 0:10, 1:15, 2:35, even thouh w're using only a and b, 3rd argument i.e 35 is still accessible
  return a+b;
}

console.log(first(10,15,35));

//arrow function
const first=(a,b)=>{
  console.log(arguments);//reference error, arguments is undefined
  return a+b;
}

console.log(first(10,15,35));


//this keyword - no longer bound

//before
const user={
  fname:'marc',
  cities:['Barcelona','Catalunya','Madrid'],
  placesCloseToMe:function(){
    var that=this;
       
    this.cities.forEach(function(city){
      console.log(that.fname + ' lived in ' + city);
    });
    
   }
   
};

user.placesCloseToMe();

//arrow functions will use its parent context by default, hence we remove that=this and use arrow function for inner functions
const user={
  fname:'marc',
  cities:['Barcelona','Catalunya','Madrid'],
  placesCloseToMe:function(){
    //var that=this;
       
    this.cities.forEach((city)=>{
      console.log(this.fname + ' lived in ' + city);
    });
    
   }
   
};

user.placesCloseToMe();

//but you cannot use arrow functions for object methods as arrow function will set parent context i.e window instead of object's context

const user={
  fname:'marc',
  cities:['Barcelona','Catalunya','Madrid'],
  placesCloseToMe(){    //------------------------------------------this also works, its new in ES6
    //var that=this;
       
    this.cities.forEach((city)=>{
      console.log(this.fname + ' lived in ' + city);
    });
    
   }
   
};

user.placesCloseToMe();


//using map instead of forEach
const user={
  fname:'marc',
  cities:['Barcelona','Catalunya','Madrid'],
  placesCloseToMe(){
    //var that=this;
       
    const newArr=this.cities.map((city)=>{
      return this.fname + ' lived in ' + city;
      
    });
    return newArr;
   }
   
};

console.log(user.placesCloseToMe());

//-----------------can be futher simplified
const user={
  fname:'marc',
  cities:['Barcelona','Catalunya','Madrid'],
  placesCloseToMe(){
    //var that=this;
       
    return this.cities.map((city)=>{
      return this.fname + ' lived in ' + city;
      
    });
   
   }
   
};

console.log(user.placesCloseToMe());

//-----------------can be futher simplified using "Arrow Function - Expression" method
const user={
  fname:'marc',
  cities:['Barcelona','Catalunya','Madrid'],
  placesCloseToMe(){
    //var that=this;
       
    return this.cities.map((city)=> this.fname + ' lived in ' + city);
   
   }
   
};

console.log(user.placesCloseToMe());

//challenge -  multiple the array of numbers
const multiplier={
  numbers:[10,11,12],
  multiplyBy:2,
  multiply(){
    
    return this.numbers.map((num)=>{
      return this.multiplyBy * num;
      
    });
    
  }
};

console.log(multiplier.multiply());

//-----challenge further simplified
const multiplier={
  numbers:[10,11,12],
  multiplyBy:2,
  multiply(){
    
    return this.numbers.map((num)=> this.multiplyBy * num);
    
  }
};

console.log(multiplier.multiply());