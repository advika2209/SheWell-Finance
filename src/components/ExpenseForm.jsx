 import { useState } from 'react'; 
 import { addExpense } from '../lib/storage'; 
 const CATEGORIES = ['mandatory', 'academic', 'safety']; 
 export default function ExpenseForm({ onAdded }) { 
     const [amount, setAmount] = useState('');
       const [category, setCategory] = useState('mandatory'); 
        const [note, setNote] = useState(''); 
         const [month, setMonth] = useState(''); 
          function handleSubmit(e) {  
              e.preventDefault(); 
                 if (!amount || !month.trim()) return; 
                    addExpense({
                              amount: parseFloat(amount),
                                    category,
                                          note: note.trim(),
                                                 month: month.trim(), 
                                           });  
                                             setAmount(''); 
                                                setNote(''); 
                                                   onAdded(); 
                                                 } 
                                                   return ( 
                                                       <form onSubmit={handleSubmit} className="expense-form">
                                                              <label> 
                                                                       Amount 
                                                                              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required min="0" step="0.01" />

                                                                                    </label> 
                                                                                         <label> 
                                                                                                   Category  
                                                                                                         <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                                                                                                      {CATEGORIES.map((c) => (
                                                                                                                                    <option key={c} value={c}>{c}</option>
                                                                                                                                          ))} 
                                                                                                                                                 </select>
                                                                                                                                                       </label> 
                                                                                                                                                            <label>
                                                                                                                                                                        Note
                                                                                                                                                                                <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. bus pass" />
                                                                                                                                                                                      </label>
                                                                                                                                                                                            <label>
                                                                                                                                                                                                        Month 
                                                                                                                                                                                                               <input value={month} onChange={(e) => setMonth(e.target.value)} placeholder="e.g. September" required />
                                                                                                                                                                                                                     </label>
                                                                                                                                                                                                                           <button type="submit">Add expense</button> 
                                                                                                                                                                                                                              </form> 
                                                                                                                                                                                                                               );
                                                                                                                                                                                                                             }