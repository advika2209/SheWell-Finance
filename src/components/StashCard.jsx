// src/components/StashCard.jsx
import { useState } from 'react';

const PACE_OPTIONS = [
  { label: 'Relaxed', weeks: 16 },
  { label: 'Steady', weeks: 12 },
  { label: 'Faster', weeks: 6 },
];

export default function StashCard({
  safetyPremium,
  stashTarget,
  income,
  mandatory,
  academic,
  totalExpenses,
  remaining,
  saved,
  onSaveUpdate,
}) {
  const [savedInput, setSavedInput] = useState('');
  const progressPercent = stashTarget > 0 ? Math.min(100, Math.round((saved / stashTarget) * 100)) : 0;

  function handleSavedSubmit(e) {
    e.preventDefault();
    const value = parseFloat(savedInput);
    if (isNaN(value) || value < 0) return;
    onSaveUpdate(value);
    setSavedInput('');
  }

  return (
    <div className="stash-card">
      <section className="stash-section">
        <h3>How this target was calculated</h3>
        <p>Your safety premium is ₹{safetyPremium}/month. We suggest a cushion of three months' worth, in case a rough month costs more than usual:</p>
        <p className="stash-formula">₹{safetyPremium} × 3 months = ₹{stashTarget}</p>
      </section>

      <section className="stash-section">
        <h3>Where this fits in your budget</h3>
        <ul className="stash-context-list">
          <li><span>Monthly income</span><span>₹{income}</span></li>
          <li><span>Mandatory expenses</span><span>₹{mandatory}</span></li>
          <li><span>Academic expenses</span><span>₹{academic}</span></li>
          <li><span>Safety premium</span><span>₹{safetyPremium}</span></li>
          <li className="stash-context-total"><span>Remaining after all expenses</span><span>₹{remaining}</span></li>
        </ul>
      </section>

      <section className="stash-section">
        <h3>Choose your pace</h3>
        <table className="stash-pace-table">
          <thead>
            <tr><th>Pace</th><th>Timeframe</th><th>Per week</th></tr>
          </thead>
          <tbody>
            {PACE_OPTIONS.map((opt) => (
              <tr key={opt.label}>
                <td>{opt.label}</td>
                <td>{opt.weeks} weeks</td>
                <td>₹{Math.round(stashTarget / opt.weeks)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="stash-section">
        <h3>Your progress</h3>
        <div className="stash-progress-bar">
          <div className="stash-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <p>₹{saved} saved of ₹{stashTarget} target ({progressPercent}%)</p>
        <form onSubmit={handleSavedSubmit} className="stash-saved-form">
          <label>
            Update amount saved so far
            <input
              type="number"
              min="0"
              value={savedInput}
              onChange={(e) => setSavedInput(e.target.value)}
              placeholder={`Currently ₹${saved}`}
            />
          </label>
          <button type="submit">Update</button>
        </form>
      </section>
    </div>
  );
}