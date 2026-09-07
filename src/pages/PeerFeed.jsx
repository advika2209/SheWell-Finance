import peerThreads from '../data/peerThreadsSeed'; 
import ThreadCard from '../components/ThreadCard';
 export default function PeerFeed() { 
     return (   
         <div className="peer-feed-page">  
           <h1>Peer Circle</h1> 
             <p>Advice from students facing the same money decisions. Read-only for now — no personal details, no DMs.</p>  
                 {peerThreads.map((thread) => (    
                        <ThreadCard key={thread.id} thread={thread} />     
                     ))}  
                       </div>
                         ); 
                        }