//INDECISION APP using components

class IndecisionApp extends React.Component{
    
    constructor(props){
        super(props);
        this.handleDeleteOptions=this.handleDeleteOptions.bind(this);
        this.selectRandomNum=this.selectRandomNum.bind(this);
        this.handleAddOption=this.handleAddOption.bind(this);
        this.handleSingleDeleteOption=this.handleSingleDeleteOption.bind(this);
        
       
        this.state={
             options:props.options
           }
        
          }
    
    componentDidMount(){
        //use try catch for any wrong json format
         try{
            const getOptions=localStorage.getItem('allOptions');
            const options=JSON.parse(getOptions);
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
            localStorage.setItem('allOptions',setOptions);
            
        }
        
    }
    
        handleDeleteOptions(){
            this.setState(()=>({ 
                options:[] 
            }));
        }
    
      //delete single option
      handleSingleDeleteOption(optionToDelete){
        
          this.setState((prevState)=>({
              options:prevState.options.filter((option)=>{
                  return optionToDelete !== option //filter methods returns new array with the values which satisfies the condition to true, here prevState.options array's option SHOULD NOT match with option(optionToDelete) we want to delete, this is the condition, if this condition evaluates to true then add that item in returning array
                  
              })
          }));
          
      }
      
        handleAddOption(option){
            //validation
            if(!option){ //if option doesnt exist
                return 'Please add something :('
              }
              else if(this.state.options.indexOf(option)>-1){
                return 'Option already exist!!!!'
               }
            
            else{
                 
                  this.setState((prevState)=>{
                    //prevState.options.push(option); //we shoundnt do this, cuz we're manipulating prevState directly by pushin new option, push basically alter original array, we shud use concat instead
                    return{
                        //options:prevState.options  //here we directly manipulated prevState and assgining it to Options array, which is actually origianl array, we should use concat instead

                        //using concat now
                        options:prevState.options.concat([option]) //or options:prevState.options.concat(option) - passing non array value, both give same result, and new array is returned, which is basic behaviour of concat to return new array
                       }
                  });
      
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
                  <Header subtitle={subTitleText}/>
                  <Action hasOptions={this.state.options.length>0} sendRandomNum={this.selectRandomNum}/>
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

//Header component
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

//Action component
const Action = (props) =>{
     return(
            
            <div>
               <button onClick={props.sendRandomNum} disabled={!props.hasOptions}>What should i do? Pick random option</button>
            </div>
        );
        
}


//Options component
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

//AddOption component
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
       
        e.preventDefault();
        const option=e.target.elements.option.value.trim();//trimming out empty spaces
        const whatsTheOutput=this.props.addingOption(option);
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


ReactDOM.render(
<IndecisionApp /*options={['hrc','japan']}*/ />,
document.getElementById('app')
)
