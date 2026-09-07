// src/pages/SignUp.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
export default function SignUp() {
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const { login } = useUser();
 const navigate = useNavigate();
 function handleSubmit(e) {
 e.preventDefault();
 if (!name.trim() || !email.trim()) return;
 login(name.trim(), email.trim());
 navigate('/dashboard');
 }
 return (
 <div className="signup-page">
 <h1>Welcome</h1>
 <p>Let's get a picture of your money — including the costs nobody else is
tracking.</p>
 <form onSubmit={handleSubmit}>
 <label>
 Name
 <input value={name} onChange={(e) => setName(e.target.value)} required
/>
 </label>
 <label>
 Email
 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
 </label>
 <button type="submit">Get started</button>
 </form>
 </div>
 );
}