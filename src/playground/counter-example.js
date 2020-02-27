////COUNTER APP
//
//let count=0;
//const addCounter = () => {
//    /* console.log('I will add 1'); */
//    count++;
//   
//    reRender(); /* re rendering by calling the ReactDOM.render inside the function */
//    
//};
//
//const deleteCounter = () => {
//      /* console.log('I will delete 1'); */
//    count--;
//    
//    reRender(); /* re rendering by calling the ReactDOM.render inside the function */
//};
//
//const resetCounter = () => {
//     /* console.log('I will RESET'); */
//     count=0;
//   
//   reRender(); /* re rendering by calling the ReactDOM.render inside the function */
//};
//
///*
//const templateCounter=(
//    <div>
//      <h1>Counter: {count}</h1>
//      <button onClick={addCounter}>+1</button>
//      <button onClick={deleteCounter}>-1</button>
//      <button onClick={resetCounter}>Reset</button>
//    </div>
//);
//
//*/
//
//const appRoot=document.getElementById('app');//getting root element from index.html
////ReactDOM.render(templateCounter, appRoot);//rendering particular template
//
////but above will not render the h1 count, to make mit happen we wiil set a function to re-render 
//
//
//const reRender = () => {
//    
//    const templateCounter=(
//    <div>
//      <h1>Counter: {count}</h1>
//      <button onClick={addCounter}>+1</button> 
//        {/* note we're not calling funtion here on click i.e we're not using parethesis, were just referencing it, if we want it to return something then use (), else no */}
//      <button onClick={deleteCounter}>-1</button>
//      <button onClick={resetCounter}>Reset</button>
//    </div>
//        
//     /* 
//     YOU MAY THINK--------------- all the above lines wiil be re-rendered when button is clicked every time! but no, only the line which changes will be re-rendered, in our case its just h1 tag, this is achieved by React using VIRTUAL DOM, which is very efficient and fast. What is does is basically compare the virtual DOM with actual DOM and render only what is changed.  
//     You can see it happenig in dev tools under elements column, see which line flases when you click on the button, its only inside h1 tag! 
//     */  
//        
//        
//);
// ReactDOM.render(templateCounter, appRoot);   
//}
//
//reRender();



//now building with components...........................

class Counter extends React.Component{
    
    constructor(props){
        super(props);
        this.handleAddOne=this.handleAddOne.bind(this);
        this.handleMinusOne=this.handleMinusOne.bind(this);
        this.handleReset=this.handleReset.bind(this);
        
        //setting default state, state is a object with key value pairs, which is about to change
        
        this.state={
            count:props.count, //fomr default props i.e 100
            name:'nag' //state can also have multiple properties which may not chnage as well, but you can change this if you wish while using setState
            
        }
        
    }
    
    componentDidMount(){
        //console.log("counter mounter");
        
        /* const getCounter=localStorage.getItem("counterVal");
        const getCounterVal=JSON.parse(getCounter);
        const finalVal=parseInt(getCounterVal)
        this.setState(()=>({count:finalVal})); */
        
         // we're not dealing with too many objects and properties here, so JSON format is not required like above
        
        const getCounter=localStorage.getItem("counterVal");
        const finalVal=parseInt(getCounter,10);//base 10
        
        if(!isNaN(finalVal)){ //checking for not a number condition
            this.setState(()=>({count:finalVal}));
        } 
        
        
    }
    
    componentDidUpdate(prevProps,prevState){
        //console.log("component Updated");
        
        /*
        const counterValue=JSON.stringify(this.state.count);
        localStorage.setItem("counterVal",counterValue);
        */
        
       // we're not dealing with too many objects and properties here, so JSON format is not required like above
       if(prevState.count !== this.state.count){
             localStorage.setItem("counterVal",this.state.count);
        }
        
    }
    
    handleAddOne(){
        //console.log('i will add one');
        //console.log(this.state.count=this.state.count+1);
        
        
        //this.setState is a method and takes one argument i.e a function which holds data to be chnaged, and that function takes one argument which holds the previous state value, and you can name it anything since its just the name given to argument
        
        
        this.setState((prevState)=>{
            
            return {
                //changing only count property from state object, we can chnage name also if we wish
                count: prevState.count+1
            };
            
        });
    }
    
    handleMinusOne(){
        //console.log('i will minus one');
        
        this.setState((imOldState)=>{
            
            return{
                
                //changing name if clicked on decrement
                //name: 'im chnaged after decrement',
                count: imOldState.count-1
                
            };
            
        }
        
        
        );
        
    }
    
    handleReset(){
        //console.log('I will reset');
        
        // here we're not using any previous state as argument to setState method as we're just resetting the value of count  property
        
        this.setState(()=>{
            return {
                
                count:0
                
            };
            
            
            
        });
             
        
        
        
         //passing object to setState directly instead of function, not recommended when you want it track its prev state
//        this.setState({
//                      count:0
//                      
//                      });  
        
        //for example, calling one more setState right after above, but we do not have prev state captured, output expected shuold be first 0 then increment by 1
//        
//        this.setState({
//            count:this.state.count+1
//        });
        
        //this issue can be fixed by using function as argument instead of passing the object, output will be 1, first it will be reset to zero, right after that another setState gets executed which increment by 1, i.e it updated multiple setState asynchronously
        
//                this.setState(()=>{
//            return {
//                
//                count:0
//                
//            };
//            
//            
//            
//        });
//        
//         this.setState((prev)=>{
//            return {
//                
//                count:prev.count+1
//                
//            };
//            
//            
//            
//        });
        
        
     
           
        
        
    }
    
    render(){
        
        return(
            <div>
            <h1>Counter example using Components and State</h1>
            {/* <p>Name is: {this.state.name}  </p> */}
            <h2>Count:{this.state.count}</h2>
            
            <button onClick={this.handleAddOne}>+1</button>
            <button onClick={this.handleMinusOne}>-1</button>
            <button onClick={this.handleReset}>Reset</button>
            
            </div>
            
       );
        
        
    }
    
    
    
}

//setting default couter value as 93, if not sent by user as props, this will show up
Counter.defaultProps={
    count:93
}

ReactDOM.render(
<Counter /* count={-10} */ />,
    document.getElementById('app')

)

