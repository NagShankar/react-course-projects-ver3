// JSX - JavaScript XML

//...........................TIP: only one kind of comments inside JSX expression/templates works, {/* A JSX comment */}. Null, undefined and booleans values are all ignored in JSX and not printed in html file


//INDECISION APP using plain JSX

//Forms and input

//const app2={
//    name:'Indecision App',
//    options:[]
//    
//}
//
//const onFormSubmit = (e) => {
//    e.preventDefault();
//    console.log('Form submitted!');
//    
//    const option=e.target.elements.option.value;//fetch value give in input name 'option' and store it in variable option
//    if(option){
//        app2.options.push(option); //push the value into 
//        e.target.elements.option.value='';//emptying the input box
//        
//        renderingTemp();//re rendering after pushing into app2.options
//    }
//};
//
//function wipeAll(){
//    app2.options=[];
//    renderingTemp();//re rendering after wiping out app2.options
//}
//
//function onMakeDecision(){
//    const randomNum=Math.floor(Math.random() * app2.options.length);//math.random generate between 0 and 1, multiplying with array length gives random number between 0 and array length
//   //console.log(randomNum);
//    const selectedOption=app2.options[randomNum];
//    alert(selectedOption);
//}
//
//const appRoot=document.getElementById('app');
//
//
// function renderingTemp(){
//    
//    const template=(
//    <div>
//       <h1>Name: {app2.name}</h1>
//        <p>{app2.options.length > 0 ? 'Here are your options' : 'No options'}</p>
//        <p>{app2.options.length}</p>
//        <button disabled={app2.options.length === 0} onClick={onMakeDecision}>What should i do?</button>
//        <button onClick={wipeAll}>Remove All</button>
//        
//        <ol>
//          {
//            app2.options.map((option)=>{
//               return <li key={option}>{option}</li>;
//            })
//          }
//        </ol>
//        
//        
//       <form onSubmit={onFormSubmit}>
//             <input type="text" name="option"/>
//             <button>Add option</button>
//    
//       </form>
//    
//    </div>
//
//
//);
// ReactDOM.render(template, appRoot);   
//    
//};
//
//
//renderingTemp();
//




//INDECISION APP using components

class IndecisionApp extends React.Component{
    
    constructor(props){
        super(props);
        this.handleDeleteOptions=this.handleDeleteOptions.bind(this);
        this.selectRandomNum=this.selectRandomNum.bind(this);
        this.handleAddOption=this.handleAddOption.bind(this);
        this.handleSingleDeleteOption=this.handleSingleDeleteOption.bind(this);
        
        //setting dafault state
        this.state={
            //options:['marc', 'alex', 'honda']
            options:props.options
        }
        
        {/*now we need to send these options to Options component which has wipeall method which can delete and make the options zero, since button to wipe all doesnt exist in this component, hence sending as props to Options component
        */}
        
        }
    
    componentDidMount(){
       
        
        //use try catch for any wrong json format
        
        try{
        
             //console.log("indecision app mounted");
        const getOptions=localStorage.getItem('allOptions');
        const options=JSON.parse(getOptions);
         //console.log(options);
        //this.setState(()=>({options})); //or options:options - when value and key is same, then we can shorten it
        
        //we want to setState only when options are there, we dont want o run it every time even when options are zero,
        if(options){
            this.setState(()=>({options}));
            
        } 
            
        }catch(e){
            //do nothing
            
        }
    }
    
    componentDidUpdate(prevProps,prevState){
        if(prevState.options.length !== this.state.options.length){
            const setOptions=JSON.stringify(this.state.options);
            //console.log(setOptions);
            localStorage.setItem('allOptions',setOptions);
            
        }
        
    }
    
        handleDeleteOptions(){
            //option 1 to simplify setState
//            this.setState(()=>{
//                
//                return{
//                  options:[]  
//                };
//                
//            });
            
             //option 2 to simplify setState, passing object dirctly
//            this.setState({
//                options:[]
//            });
            
             //option 3 to simplify setState, returning object from arrow funtion, and implicity returning object instead of explicit return using return statement
            this.setState(()=>({ 
                options:[] 
            }));
            
        }
    
      //delete single option
      handleSingleDeleteOption(optionToDelete){
          //alert("Deleting "+option)
          this.setState((prevState)=>({
              options:prevState.options.filter((option)=>{
                  return optionToDelete !== option //filter methods returns new array with the values which satisfies the condition to true, here prevState.options array's option SHOULD NOT match with option(optionToDelete) we want to delete, this is the condition, if this condition evaluates to true then add that item in returning array
                  
              })
          }));
          
      }
      
        handleAddOption(option){
            //alert(option);
            
            //validation
            if(!option){ //if option doesnt exist
                return 'Please add something :('
                
            }
            else if(this.state.options.indexOf(option)>-1){
                
                return 'Option already exist!!!!'
            }
            
            else{
                  //option 1 to create setState
                  this.setState((prevState)=>{
                    //prevState.options.push(option); //we shoundnt do this, cuz we're manipulating prevState directly by pushin new option, push basically alter original array, we shud use concat instead
                    return{
                        //options:prevState.options  //here we directly manipulated prevState and assgining it to Options array, which is actually origianl array, we should use concat instead

                        //using concat now
                        options:prevState.options.concat([option]) //or options:prevState.options.concat(option) - passing non array value, both give same result, and new array is returned, which is basic behaviour of concat to return new array
                       }
                  });
                
                
                
                //option 2 to simply setState, implicity returning object instead of explicit return using return statement
//                this.setState((prevState)=>({
//                     options:prevState.options.concat([option])  
//                 }));
                
            
             }
            
            
            
        }
    
       selectRandomNum(){
           const randomNum=Math.floor(Math.random() * this.state.options.length);
           alert (randomNum + " " +this.state.options[randomNum]);
           
       }
        
    
    
    render(){
        //const titleText='Indicision App'; //now set as default prop
        const subTitleText='Small application using React';
        
        
        return(
         <div>
                  <Header /* title={titleText} */ subtitle={subTitleText}/>
                 
                  {/* we're sending method as a prop in sendRandomNum for the child componenet to execute*/ }
                  
                   <Action hasOptions={this.state.options.length>0} sendRandomNum={this.selectRandomNum}/>
            
            
                    {/* we're sending method as a prop in resettingOptions for the child componenet to execute*/ }
                   
                    <Options allOptions={this.state.options} 
                             resettingOptions={this.handleDeleteOptions} 
                             gotSomethingToWipe={this.state.options.length>0} 
                             deleteSingleOption={this.handleSingleDeleteOption}
                     />
                   
                
                   <AddOption addingOption={this.handleAddOption}/>
            
            </div>
        
        );
        
    }
    
    
}

//default empty options array
IndecisionApp.defaultProps={
    options:[]
}

//converting Header into functional component

const Header = (props) => {
    return (
            <div>
                <h1>{props.title}</h1> 
                {props.subtitle && <h2>{props.subtitle}</h2>}
            </div>
        ); 
    
}

//default props are objects and specific to a component
Header.defaultProps={
    
    title:"Indecision Application"
    
}

//class Header extends React.Component{ //React is an object we're extending its components capability
//    render(){ //es6 may not have any methods defined but in React needs render method to be defined all the time
//        
//               
//        //render returns JSX
//        return (
//            <div>
//            <h1>{this.props.title}</h1> 
//            <h2>{this.props.subtitle}</h2>
//            </div>
//        );
//        
//    }
//     
//}


//converting Action into functional component

const Action = (props) =>{
     return(
            
            <div>
               <button onClick={props.sendRandomNum} disabled={!props.hasOptions}>What should i do? Pick random option</button>
            </div>
        );
        
}


//class Action extends React.Component{
////    handlePick(){
////    alert('Damn i was clicked!!!');    
////    }
//    
////     wipeAll(){
////        alert('Warning! i\'ll wipe all');
////        
////    }
//    
//    render(){
//        
//        return(
//            
//            <div>
//        <button onClick={/*this.handlePick*/this.props.sendRandomNum} disabled={!this.props.hasOptions}>What should i do? Pick random option</button>
//           {/* <button onClick={this.wipeAll}>Wipe All</button> */}
//            
//            </div>
//        );
//        
//        
//    }
//    
//    
//    
//}



//converting Option into functional component
const Options = (props) => {
    
         return(
          <div>
              <button onClick={props.resettingOptions} disabled={!props.gotSomethingToWipe}>Wipe All</button>
              <p>Here are your options</p>
              <p>Here is the length: {props.allOptions.length}</p>
              {props.allOptions.length===0 && <p>Start adding some options to get started</p>}
            <ol>     
                 {
                     props.allOptions.map((option)=>{
                     return  <Option key={option} 
                                     optionText={option} 
                                     deleteSingleOption={props.deleteSingleOption}
                                     /* sending the received prop to option below using same prop name as from the parent component, can be given diff name as well */
                             />
                    })
                 }
     
             </ol>   
         </div>
        );
    
    
}


/* nesting Option component inside Options component */
//class Options extends React.Component{
//    
//    //this is efficient way to bind
////    constructor(props){
////        super(props);
////        this.wipeAll=this.wipeAll.bind(this);
////        
////    }
//    
////      wipeAll(){
////        //alert('Warning! i\'ll wipe all');
////          console.log(this.props.allOptions);
////        
////    }
// 
//    
//    
//    render(){
//        
//        return(
//          <div>
//              <button onClick={this.props.resettingOptions}>Wipe All</button>
//{/*  <button onClick={this.wipeAll.bind(this)}>Wipe All</button> 
//     binding this to wipeAll method to give access to props, but this inefficient as its inside render and it causes new function creation(i.e bind(this)) every time when rendered repeatedly */}
//             <p>Here are your options</p>
//             <p>Here is the length: {this.props.allOptions.length}</p>
//            
//       <ol>     
//       {
//         this.props.allOptions.map((option)=>{
//             return  <Option key={option} optionText={option} />
//         })
//        }
//     
//         </ol>   
//            
//           
//            </div>
//        );
//        
//    }
//    
//}

class AddOption extends React.Component{
    //using constructor here sine we're using props inside addOption method and we need to bind this
    constructor(props){
        super(props);
        this.addOption=this.addOption.bind(this);
        
        //receiving error
        this.state={
            error:undefined   //by default its undefined, in other words false
        }
        
    }
    

    addOption(e){
        //alert('i will add something');
        e.preventDefault();
        //const option=e.target.elements.option.value;
        const option=e.target.elements.option.value.trim();//trimming out empty spaces
       
        //now vaidation is done inside parent component itself
//        if(option){
//           //alert(option);
//            this.props.addingOption(option);
//            e.target.elements.option.value='';//emptying the input box after submitting
//        }
        
         const whatsTheOutput=this.props.addingOption(option);
        
         //option 1 to create setState
//         this.setState(()=>{
//        return{
//            error: whatsTheOutput
//        }
//    });
        
        //option 2 to simplify setState, implicity returning object instead of explicit return using return statement
        this.setState(()=>({error:whatsTheOutput}));
        
        if(!whatsTheOutput){
            e.target.elements.option.value='';//emptying the input box if there is no error like duplicate submit or no values
        }
         
    }
    
    render(){
        
        return(
          <div>
            <form onSubmit={this.addOption}>
                <input type="text" name="option"/>
                 <button>Add Options</button>
            </form>
            {/* this will display only if there's an error*/}
             {this.state.error && <p>{this.state.error}</p>}
            </div>
        );
        
    }
    
}


//converting Option into functional component

const Option = (props) => {
    
      return(
              <li>
                   {props.optionText}
                  <span> </span>
                   {/* <button onClick={props.deleteSingleOption}>Remove this option</button> */}
                   {/* but we need to send option to delete along with triggerng the method */}
                    
                    <button 
                            onClick={(e)=>{
                                           props.deleteSingleOption(props.optionText)
                                          }
                                     }
                     >
                     Remove this option</button>
          
              </li>
           );
    
}

//class Option extends React.Component{
//    render(){
//      
//        return(
//      
//             <li>{this.props.optionText}</li>
//              
//         
//        );
//        
//    }
//    
//    
//}



ReactDOM.render(
<IndecisionApp /*options={['hrc','japan']}*/ />,
document.getElementById('app')
)
