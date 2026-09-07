export default function ExpenseList({ expenses }) {
      if (expenses.length === 0) {
            return <p>No expenses logged yet.</p>;
              } 
                return (  
                      <ul className="expense-list">
                              {expenses.map((exp) => ( 
                                       <li key={exp.id}> 
                                                <span className="expense-category">{exp.category}</span> 
                                                         <span className="expense-amount">₹{exp.amount}</span>
                                                         <span className="expense-note">{exp.note}</span>          <span className="expense-month">{exp.month}</span> 
                                                                </li> 
                                                                     ))}
                                                                         </ul>
                                                                           );
                                                                         }
                                                        