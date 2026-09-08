// src/pages/StashSuggestion.jsx
import { useState, useEffect } from 'react';
import { getExpenses, getIncome, getStashSaved, setStashSaved } from '../lib/storage';
import StashCard from '../components/StashCard';

function totalFor(expenses, category) {
  return expenses.filter((e) => e.category === category).reduce((sum, e) => sum + e.amount, 0);
}

export default function StashSuggestion() {
  const [expenses, setExpensesState] = useState([]);
  const [income, setIncomeState] = useState(0);
  const [saved, setSavedState] = useState(0);

  useEffect(() => {
    setExpensesState(getExpenses());
    setIncomeState(getIncome());
    setSavedState(getStashSaved());
  }, []);

  const mandatory = totalFor(expenses, 'mandatory');
  const academic = totalFor(expenses, 'academic');
  const safetyPremium = totalFor(expenses, 'safety');
  const totalExpenses = mandatory + academic + safetyPremium;
  const remaining = income - totalExpenses;
  const stashTarget = safetyPremium * 3;

  function handleSaveUpdate(amount) {
    setStashSaved(amount);
    setSavedState(amount);
  }

  return (
    <div className="stash-suggestion-page">
      <h1>Your Safety Stash</h1>
      <p>Your safety premium isn't the same every month — some weeks cost more than others. This is a cushion sized to absorb that swing, built up gradually rather than all at once.</p>
      {safetyPremium === 0 ? (
        <p>Complete the safety survey first so we can suggest a stash target for you.</p>
      ) : (
        <StashCard
          safetyPremium={safetyPremium}
          stashTarget={stashTarget}
          income={income}
          mandatory={mandatory}
          academic={academic}
          totalExpenses={totalExpenses}
          remaining={remaining}
          saved={saved}
          onSaveUpdate={handleSaveUpdate}
        />
      )}
    </div>
  );
}