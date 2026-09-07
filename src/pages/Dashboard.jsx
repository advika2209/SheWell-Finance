import { useState, useEffect } from 'react';
 import { getExpenses, getIncome, setIncome } from '../lib/storage'; 
 import { useUser } from '../hooks/useUser'; 
 function totalFor(expenses, category) { 
     return expenses.filter((e) => e.category === category).reduce((sum, e) => sum + e.amount, 0);
     } 
     export default function Dashboard() {
          const { user } = useUser();
            const [expenses, setExpensesState] = useState([]);
              const [income, setIncomeState] = useState(0); 
               const [incomeInput, setIncomeInput] = useState('');
                 useEffect(() => {
                        setExpensesState(getExpenses()); 
                           setIncomeState(getIncome());
                          }, []); 
                           function handleIncomeSubmit(e) { 
                               e.preventDefault();
                                   const value = parseFloat(incomeInput); 
                                      if (isNaN(value)) return;
                                          setIncome(value); 
                                             setIncomeState(value); 
                                                setIncomeInput(''); 
                                             } 
                                              const mandatory = totalFor(expenses, 'mandatory'); 
                                               const academic = totalFor(expenses, 'academic'); 
                                                const safety = totalFor(expenses, 'safety'); 
                                                 const totalExpenses = mandatory + academic + safety;
                                                   const remaining = income - totalExpenses;
                                                     return (
                                                            <div className="dashboard-page">
                                                                      <h1>Hi {user?.name || 'there'}</h1>
                                                                            <form onSubmit={handleIncomeSubmit}> 
                                                                                       <label>
                                                                                                  Monthly income/allowance 
                                                                                                           <input
                                                                                                                       type="number"
                                                                                                                                   value={incomeInput} 
                                                                                                                                               onChange={(e) => setIncomeInput(e.target.value)}
                                                                                                                                                           placeholder={income ? `Currently ₹${income}` : 'Enter amount'}
                                                                                                                                                                     />
                                                                                                                                                                             </label>
                                                                                                                                                                                     <button type="submit">Save</button>
                                                                                                                                                                                           </form>
                                                                                                                                                                                                 <div className="totals">
                                                                                                                                                                                                            <p>Mandatory: ₹{mandatory}</p>
                                                                                                                                                                                                                    <p>Academic: ₹{academic}</p>
                                                                                                                                                                                                                            <p>Safety premium: ₹{safety}</p>
                                                                                                                                                                                                                                    <p>Total expenses: ₹{totalExpenses}</p>
                                                                                                                                                                                                                                            <p>Remaining: ₹{remaining}</p>
                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                     }
