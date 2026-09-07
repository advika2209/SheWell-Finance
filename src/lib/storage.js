// src/lib/storage.js
// Thin wrapper around localStorage. Nobody in the app calls localStorage directly —
// everyone goes through these functions so the data shape stays consistent.

const KEYS = {
  USER: 'user',
  INCOME: 'income',
  EXPENSES: 'expenses',
  SURVEY_RESPONSES: 'surveyResponses',
};

function getItem(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.error(`storage.js: failed to read ${key}`, err);
    return fallback;
  }
}

function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`storage.js: failed to write ${key}`, err);
  }
}

// ---- User ----
export function getUser() {
  return getItem(KEYS.USER, null);
}
export function setUser(user) {
  setItem(KEYS.USER, user);
}
export function clearUser() {
  localStorage.removeItem(KEYS.USER);
}

// ---- Income ----
export function getIncome() {
  return getItem(KEYS.INCOME, 0);
}
export function setIncome(amount) {
  setItem(KEYS.INCOME, amount);
}

// ---- Expenses: { id, amount, category, note, month } ----
export function getExpenses() {
  return getItem(KEYS.EXPENSES, []);
}
export function setExpenses(expenses) {
  setItem(KEYS.EXPENSES, expenses);
}
export function addExpense(expense) {
  const expenses = getExpenses();
  const newExpense = { id: crypto.randomUUID(), ...expense };
  expenses.push(newExpense);
  setItem(KEYS.EXPENSES, expenses);
  return newExpense;
}

// ---- Survey responses: { id, date, answers, computedPremium } ----
export function getSurveyResponses() {
  return getItem(KEYS.SURVEY_RESPONSES, []);
}
export function addSurveyResponse(response) {
  const responses = getSurveyResponses();
  const newResponse = { id: crypto.randomUUID(), date: new Date().toISOString(), ...response };
  responses.push(newResponse);
  setItem(KEYS.SURVEY_RESPONSES, responses);
  return newResponse;
}

// ---- Testing / demo reset ----
export function clearAll() {
  localStorage.clear();
}