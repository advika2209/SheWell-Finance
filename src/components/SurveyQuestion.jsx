export default function SurveyQuestion({ question, value, onChange }) {  
    return (
         <div className="survey-question">    
           <label>   
                 {question.text}     
                 <input        
                   type="number"       
                   min="0"          
                   value={value}        
                   onChange={(e) => onChange(question.id, e.target.value)}       
                   placeholder={question.isDirectAmount ? '₹ per month' : 'times per month'}      
                  />      
                </label>  
              </div> 
             ); 
        }