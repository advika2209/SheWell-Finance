// src/pages/SafetySurvey.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addExpense, addSurveyResponse, getExpenses, setExpenses } from '../lib/storage';
import SurveyQuestion from '../components/SurveyQuestion';

const SURVEY_QUESTIONS = [
  {
    id: 'paidRides',
    text: 'In a typical month, how many times do you take a paid ride instead of walking or transit because it felt unsafe?',
    costPerInstance: 100,
  },
  {
    id: 'earlyExits',
    text: 'How many times a month do you leave somewhere earlier, or pay for a faster/safer way back, to avoid being out late?',
    costPerInstance: 60,
  },
  {
    id: 'skippedDeals',
    text: 'How many times a month do you skip a cheaper option because getting there/back safely felt like too much hassle or cost?',
    costPerInstance: 50,
  },
  {
    id: 'safetyItems',
    text: 'How many times a month do you buy something specifically for personal safety (alarm, pepper spray, extra recharge for location sharing)?',
    costPerInstance: 80,
  },
  {
    id: 'saferHousingPremium',
    text: 'Do you pay extra rent/hostel fees specifically for a safer location? If so, how much extra per month?',
    isDirectAmount: true,
  },
  {
    id: 'safetyApps',
    text: 'Do you pay for safety-related subscriptions (location-sharing apps, safety services)? If so, how much per month?',
    isDirectAmount: true,
  },
];

export default function SafetySurvey() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  function handleChange(id, value) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function calculatePremium() {
    let total = 0;
    SURVEY_QUESTIONS.forEach((q) => {
      const value = Number(answers[q.id]) || 0;
      total += q.isDirectAmount ? value : value * q.costPerInstance;
    });
    return total;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const premium = calculatePremium();
    setResult(premium);
    addSurveyResponse({ answers, computedPremium: premium });

    // Replace any previous survey-computed entry instead of piling up duplicates
    const filtered = getExpenses().filter((exp) => exp.note !== 'Safety premium (from survey)');
    setExpenses(filtered);
    addExpense({
      amount: premium,
      category: 'safety',
      note: 'Safety premium (from survey)',
      month: new Date().toLocaleString('default', { month: 'long' }),
    });
  }

  return (
    <div className="safety-survey-page">
      <h1>Your Safety Premium</h1>
      <p>Every rupee here is money you spend purely to stay safe — a ride instead of a walk, leaving early instead of staying out. It's real spending, but it never shows up as its own line item. Answering honestly turns it into a number you can actually plan around.</p>
      <p>Answer honestly — there's no "too much" or "too little" here.</p>
      <form onSubmit={handleSubmit}>
        {SURVEY_QUESTIONS.map((q) => (
          <SurveyQuestion
            key={q.id}
            question={q}
            value={answers[q.id] || ''}
            onChange={handleChange}
          />
        ))}
        <button type="submit">Calculate my safety premium</button>
      </form>

      {result !== null && (
        <div className="survey-result">
          <h2>Your estimated monthly safety premium: ₹{result}</h2>
          <p>This has been added to your expense tracker under "safety."</p>
          <button onClick={() => navigate('/stash')}>See your stash suggestion</button>
        </div>
      )}
    </div>
  );
}