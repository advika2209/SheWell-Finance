export default function ThreadCard({ thread }) { 
     return (  
          <div className="thread-card">  
              <span className="thread-tag">{thread.tag}</span>  
                 <h3>{thread.title}</h3>   
                    <p>{thread.body}</p>  
                      </div>
                        ); 
                    }