import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from 'react-router-dom'


const Create = () => {

    const blogUrl = 'http://164.90.153.244/api/blogs/'
    //const userUrl = 'https://my-json-server.typicode.com/ethanoutangoun/outiblog-jsonserver/user'

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();


    

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };

        setIsPending(true);
        
        fetch(blogUrl, {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new blog added')
            
            


            setIsPending(false);
            history.push('/')
        })

        
    }

 
    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input
                    type = "text" 
                    required
                    value ={title}
                    onChange={(e) => setTitle(e.target.value)}/>
                    

                <label>Blog body:</label>
                <textarea
                    required
                    value = {body}
                    onChange={(e)=> setBody(e.target.value)}>
                </textarea>

                <label>Blog author:</label>
                <input
                    required
                    value = {author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    
                </input>

                { !isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding blog...</button>}
          


                
                <Link className="secret" to="/iloveu">Hello</Link>
              
            </form>
        </div>
     );
}
 
export default Create;