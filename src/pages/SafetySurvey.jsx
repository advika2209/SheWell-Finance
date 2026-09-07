import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addExpense, addSurveyResponse } from '../lib/storage';
import SurveyQuestion from '../components/SurveyQuestion';

const SURVEY_QUESTIONS = [
  {
    id: 'paidRides',
    text: 'In a typical month, how many times do you take a paid ride instead of walking or transit because it felt unsafe?',
    costPerInstance: 250, // Updated realistic cost
  },
  {
    id: 'earlyExits',
    text: 'How many times a month do you leave somewhere earlier, or pay for a faster/safer way back, to avoid being out late?',
    costPerInstance: 150,
  },
  {
    id: 'skippedDeals',
    text: 'How many times a month do you skip a cheaper option because getting there/back safely felt like too much hassle or cost?',
    costPerInstance: 100,
  },
  {
    id: 'safetyItems',
    text: 'How many times a month do you buy something specifically for personal safety (alarm, pepper spray, extra recharge)?',
    costPerInstance: 350,
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
  const [monthlyIncome, setMonthlyIncome] = useState('');
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
    const incomeNum = Number(monthlyIncome) || 0;
    const percentage = incomeNum > 0 ? ((premium / incomeNum) * 100).toFixed(1) : 0;

    const resultData = {
      amount: premium,
      income: incomeNum,
      percentage: percentage,
    };

    setResult(resultData);

    addSurveyResponse({ answers, computedPremium: premium, income: incomeNum });
    addExpense({
      amount: premium,
      category: 'safety',
      note: `Safety premium (${percentage}% of monthly income)`,
      month: new Date().toLocaleString('default', { month: 'long' }),
    });
  }

  return (
    <div className="safety-survey-page">
      <h1>Your Safety Premium</h1>
      <p>Answer honestly — there's no "too much" or "too little" here.</p>

      <form onSubmit={handleSubmit}>
        {/* Income Input Section */}
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            What is your approximate net monthly income / allowance (₹)?
          </label>
          <input
            type="number"
            placeholder="e.g. 30000"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
          />
        </div>

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
        <div className="survey-result" style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
          <h2>Your estimated monthly safety premium: ₹{result.amount}</h2>
          {result.income > 0 && (
            <p style={{ fontSize: '1.2rem', color: '#d9534f', fontWeight: 'bold' }}>
              You are spending <span>{result.percentage}%</span> of your monthly income on safety alone!
            </p>
          )}
          <p>This has been added to your expense tracker under "safety."</p>
          <button onClick={() => navigate('/stash')}>See your stash suggestion</button>
        </div>
      )}
    </div>
  );
}
