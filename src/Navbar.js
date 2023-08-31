import { Link } from 'react-router-dom'
import useFetch from './useFetch';
import ProfilePopover from './ProfilePopover';
import Skeleton from '@mui/material/Skeleton';


const Navbar = () => {

    
  
    const userUrl = 'https://my-json-server.typicode.com/ethanoutangoun/outiblog-jsonserver/user';
    const { data, isPending, error } = useFetch(userUrl)   

    

    return ( 
        <nav className="navbar">
            <h1>Outiblog</h1>
            
            
            <div className="links">
                <Link to="/" draggable={false}>Home</Link>
                <Link 
                
                    to="/create" 
                    draggable={false}
                    style = {{
                        color: "white",
                        backgroundColor: '#f1356d',
                        borderRadius:  '8px',
                    }}>
                            New Blog</Link>

                
            </div>
                    
            <div>
                { isPending && 
                    <div className="profile-container">
                        <Skeleton className="profile-picture" variant="circular" width={30} height={30} draggable={false}/>
                    </div>
                }
                { error && 
                    <div className="profile-container">
                        <Skeleton className="profile-picture" variant="circular" width={30} height={30} draggable={false}/>
                    </div>
                }

                {data && <ProfilePopover data= {data}/>}
                
            </div>

            
        </nav>
     );
}
 
export default Navbar;