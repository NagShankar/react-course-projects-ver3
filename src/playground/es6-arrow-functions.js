//arrow functions basics

//normal functions
function square(y){
    return y*y;
}
console.log(square(8));

//arrow functions, they're anonymous, they cannot have name like above
const squareArrow =(x)=>{
  return x*x;
}

console.log(squareArrow(10));


//arrow functions can return implicitly if we use the "ARROW FUNCTION - EXPRESSION" syntax i.e without curly braces, we cannot use this when we have function calls of return of promises etc inside the arrow function
const squareArrow2=(x) => x*x; //here we've removed curly braces here
console.log(squareArrow2(12));