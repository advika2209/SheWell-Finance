import { useState, useEffect } from 'react'; 
import { getExpenses } from '../lib/storage'; 
import ExpenseForm from '../components/ExpenseForm';
 import ExpenseList from '../components/ExpenseList';
  const FILTERS = ['all', 'mandatory', 'academic', 'safety'];
   export default function ExpenseTracker() {
    
    const [expenses, setExpenses] = useState([]); 
     const [filter, setFilter] = useState('all'); 
       function refresh() { 
           setExpenses(getExpenses());
          } 
            useEffect(() => { 
                   refresh(); 
                 }, []); 
                   const visible = filter === 'all' ? expenses : expenses.filter((e) => e.category === filter);
                      return (  
                          <div className="expense-tracker-page">  
                              <h1>Expense Tracker</h1> 
                                   <ExpenseForm onAdded={refresh} />  
                                       <div className="filter-row">   
                                             {FILTERS.map((f) => ( 
                                                         <button key={f} onClick={() => setFilter(f)} className={filter === f ? 'active' : ''}>
                                                                        {f} 
                                                                                 </button>  
                                                                                       ))}
                                                                                             </div> 
                                                                                                  <ExpenseList expenses={visible} /> 
                                                                                                     </div>
                                                                                                       );
                                                                                                     }
