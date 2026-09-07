import { Link } from 'react-router-dom';
export default function NavBar() {
    return (
 <nav className="navbar">
 <Link to="/dashboard">Dashboard</Link>
 <Link to="/expenses">Expenses</Link>
 <Link to="/safety-survey">Safety Survey</Link>
 <Link to="/stash">Stash</Link>
 <Link to="/peer-feed">Peer Feed</Link>
 </nav>
 );
}
