//let and const are block level scoped, means they're not accesbile outside if, or for or {} only if its declared out of the block

var lname='shankar';
var lname='marquez';//re-declaring works for Var 
console.log(lname);

var lname='shankar';
lname='marquez';//here re-assiging  works for Var
console.log(lname);

let fname='nag';
let fname='marc';//here re-dclaring DOESN'T works
console.log(fname);

let fname='nag';
fname='marc';//here re-assiging  works
console.log(fname);

const fname='nag';
const fname='marc';//here re-dclaring DOESN'T works
console.log(fname);

const fname='nag';
fname='marc';//here re-assiging also DOESN'T works
console.log(fname);

let fullName='Nag shankar';
function f(){
    let firstName=fullName.split(' ')[0];
    console.log(firstName);
}
f();
console.log(firstName);//DOESN'T works since let was defined inside the block {}



let fullName='Nag shankar';
let firstName;
function f(){
     firstName=fullName.split(' ')[0];
     console.log(firstName);
}
f();
console.log(firstName);//works since let was defined outside the scope i.e global


