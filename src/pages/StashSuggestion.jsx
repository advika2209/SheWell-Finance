   // src/pages/StashSuggestion.jsx
import { useState, useEffect } from 'react';
import { getExpenses } from '../lib/storage';
import StashCard from '../components/StashCard';

function getSafetyPremium(expenses) {
  return expenses.filter((e) => e.category === 'safety').reduce((sum, e) => sum + e.amount, 0);
}

export default function StashSuggestion() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    setExpenses(getExpenses());
  }, []);

  const safetyPremium = getSafetyPremium(expenses);
  const stashTarget = safetyPremium * 3;
  const weeklySetAside = stashTarget > 0 ? stashTarget / 12 : 0;

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
          weeklySetAside={weeklySetAside}
        />
      )}
    </div>
  );
}
