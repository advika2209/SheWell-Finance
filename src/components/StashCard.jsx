export default function StashCard({ safetyPremium, stashTarget,
weeklySetAside }) {
 return (
 <div className="stash-card">
 <p>Your estimated monthly safety premium is ₹{safetyPremium}.</p>
 <p>
 We suggest building a stash of ₹{stashTarget} — about three months of
that cost —
 as a cushion for months when it runs higher than usual.
 </p>
 <p>Putting aside roughly ₹{Math.round(weeklySetAside)} a week would get
you there in about 12 weeks.</p>
 </div>
 );
}
