import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useUser } from './hooks/useUser';
import NavBar from './components/NavBar';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ExpenseTracker from './pages/ExpenseTracker';
import SafetySurvey from './pages/SafetySurvey';
import StashSuggestion from './pages/StashSuggestion';
import PeerFeed from './pages/PeerFeed';
function RequireUser() {
 const { user } = useUser();
 if (!user) return <Navigate to="/" replace />;
 return (
 <>
 <NavBar />
 <Outlet />
 </>
 );
}
export default function App() {
 return (
 <BrowserRouter>
 <Routes>
 <Route path="/" element={<SignUp />} />
 <Route element={<RequireUser />}>
 <Route path="/dashboard" element={<Dashboard />} />
 <Route path="/expenses" element={<ExpenseTracker />} />
 <Route path="/safety-survey" element={<SafetySurvey />} />
 <Route path="/stash" element={<StashSuggestion />} />
 <Route path="/peer-feed" element={<PeerFeed />} />
 </Route>
 </Routes>
 </BrowserRouter>
 );
}