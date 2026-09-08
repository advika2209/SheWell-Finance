// src/lib/storage.js
const KEYS = {
  USER: 'user',
  INCOME: 'income',
  EXPENSES: 'expenses',
  SURVEY_RESPONSES: 'surveyResponses',
  STASH_SAVED: 'stashSaved',
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

export function getUser() {
  return getItem(KEYS.USER, null);
}
export function setUser(user) {
  setItem(KEYS.USER, user);
}
export function clearUser() {
  localStorage.removeItem(KEYS.USER);
}

export function getIncome() {
  return getItem(KEYS.INCOME, 0);
}
export function setIncome(amount) {
  setItem(KEYS.INCOME, amount);
}

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

export function getStashSaved() {
  return getItem(KEYS.STASH_SAVED, 0);
}
export function setStashSaved(amount) {
  setItem(KEYS.STASH_SAVED, amount);
}

export function clearAll() {
  localStorage.clear();
}