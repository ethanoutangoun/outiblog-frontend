
import BlogList from './BlogList';
import useFetch from './useFetch';


const Home = () => {

    const blogUrl = 'http://164.90.153.244/api/blogs/'
   
    const { data: blogs, isPending, error } = useFetch(blogUrl)   

    

    return ( 
        <div className="home">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            {blogs && <BlogList blogs = {blogs} title = {"All Blogs"}/>}

        </div>
     );
}
 
export default Home;