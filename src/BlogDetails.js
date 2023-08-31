
import useFetch from './useFetch'
import Comments from "./Comments";
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DeleteBlogModal from "./DeleteBlogModal";


const BlogDetails = () => {

    //blog url
    const blogUrl = 'http://164.90.153.244/api/blogs/'
    const userUrl = 'https://my-json-server.typicode.com/ethanoutangoun/outiblog-jsonserver/user'

    //id is from the specified route
    
    const { id } = useParams();
    //const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
    const { data: blog, error, isPending } = useFetch(blogUrl + id);
    const history = useHistory();//to redirect once delelted

    const {data: user, userError, userIsPending} = useFetch(userUrl)


    //Handle Delete button
    const handleClick = () =>{
        fetch(blogUrl + id, {
            method: 'DELETE'
        }).then(() => {
           
            history.push('/')
        })
    }

   

    return ( 
        <div>
            { isPending && <div>Loading...</div>}
            { error && <div>{error}</div>}
            { blog &&(
                <div>
                <article className="blog-details">
                    <div className="blog-details-head">
                        <h2>{ blog.title }</h2>
                        <DeleteBlogModal handleClick = {handleClick}/>


                        {/*user && (blog.author === user.username) && <DeleteBlogModal handleClick = {handleClick}/>*/}
                     
                    </div>
                    <div className="blog-details-body">
                        
                        <p>Written by {blog.author}</p>
                        <div>{blog.body}</div>   
                        
                    </div>
                    
                   

                </article>
                
                {<Comments blog={blog} id={id} user = {user} userError = {userError} userIsPending = {userIsPending}/>}
                </div>
            )}
           
        </div>
     );
}
 
export default BlogDetails