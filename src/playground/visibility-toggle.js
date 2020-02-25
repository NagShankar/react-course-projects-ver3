/* visibility toggling challenge */

//let visibility=false;
//
//const toggleTrueFalse = () =>{
//   visibility = visibility ? false : true;
//    // or simply visibility=!visibility;
//    console.log(visibility);
//    renderVisibility();
//}
//
//const renderVisibility = () => {
//   
//    const template9 = (
//    <div>
//        <h1>Visibility Toggle</h1>
//         <button onClick={toggleTrueFalse}>{visibility ? 'Hide Details' : 'Show Details'}</button>
//        { /* visibility ? <p>im showed up</p> : '' */  /* using ternary operator, here display p tag if true else empty, two parameters involved*/
//        
//          /* or use below logical AND, here it always expects first value to be true and then checks for second, else ignore it, hence only one check is done and then the display is done */
//        } 
//        
//        
//    { visibility && (
//        <div>
//            <p>hey there you will see me</p>
//        </div>
//      )
//    }
//         
//   </div>
//);
//    
//  ReactDOM.render(template9, app);   
//    
//}
//
//renderVisibility();



// now building useing components and state

class ToggleVisibility extends React.Component{
    
    constructor(props){
       super(props); 
        
        //bindind 'this' to the method to give the context
        this.handleToggle=this.handleToggle.bind(this);    
        
        //setting default state
        this.state={
            visibility:false
        }
    
    }
    
    
    handleToggle(){
        
        //console.log('im activated');
        
        this.setState((prevState)=>{
            
            return{
                visibility: !prevState.visibility // flipping/toggling boolean values using negate
            };
            
                        
           }
        
        
        );
        
    }
    
    
    render(){
        
        return(
          <div>
             <h1>Visibility toggle - Using Components and State</h1>
             
            <button onClick={this.handleToggle}>{this.state.visibility ? 'Hide Details' : 'Show Details' }</button>
             
            {/* rendering only if its visibility is true */}
            { this.state.visibility && (<div><p>Woohoo! You will see me.</p></div>) }
            
            
            </div>
            
        );
        
        
        
    }
    
    
}


ReactDOM.render(
<ToggleVisibility />,
    document.getElementById('app')
)
