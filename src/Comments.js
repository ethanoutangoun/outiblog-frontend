import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from 'date-fns';
import { CircularProgress } from "@mui/material";
import BasicPopover from "./PopOver";
import { v4 as uuidv4 } from 'uuid';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';


const Comments = ({ blog, id, user, userError, userIsPending }) => {

  const blogUrl = 'http://164.90.153.244/api/blogs/' + id;



  const [comment, setComment] = useState("");
  const [updatedBlog, setUpdatedBlog] = useState(blog);//initialize state of updated blog to og blog
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(null);//if state == to cid then display edit input form
  const [editedComment, setEditedComment] = useState(null)//state for the edited input of a comment
  const[initalComment, setInitialComment] = useState(null)//check if comment has been changed to allow editing
  const [userInfo, setUserInfo] = useState(user);

  
  console.log(userInfo)
  //Change this later when adding authentication
  const username = "ethanoutangoun"

  const [hoveredCommentIndex, setHoveredCommentIndex] = useState(null);

  useEffect(() => {
    // Update the component with the latest comments whenever the 'blog' prop changes
    setUpdatedBlog(blog);
  }, [blog]);


  //ADD COMMENTS
  function addComment(newComment) {

    //set pending state to true to start loading animation
    setIsPending(true)

    if (!newComment) {
      setIsPending(false)//exit load animation
      return; // Don't add empty comments
    }



    const updatedData = {
      ...updatedBlog,
      comments: [...updatedBlog.comments, 
        {   cid:uuidv4(),
            username: username,
            text: newComment, 
            date: new Date(),
            likes: 0,
            edited: false
        }],
    };


    //simulate server fetching set to 300ms
    setTimeout(() => {
        fetch(blogUrl, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        })
            .then(() => {
            setComment("");
            // Update the state with the new comments to trigger a re-render
            setIsPending(false)
            setUpdatedBlog(updatedData);
            })
            .catch((error) => {
            console.error("Error:", error);
            });
        }, );

        
  }

  function delComment(cid){
   
    const updatedComments = updatedBlog.comments.filter(
      (comment) => comment.cid !== cid
    );


    const updatedData = {
      ...updatedBlog,
      comments: updatedComments,
    };

    

    //simulate server fetching set to 300ms
    setTimeout(() => {
      fetch(blogUrl, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
      })
          .then(() => {
        
          // Update the state with the new comments to trigger a re-render
          setUpdatedBlog(updatedData);

          })
          .catch((error) => {
          console.error("Error:", error);
          });
      }, );
    
  }

  function editComment(comment){
    setIsEditing(comment.cid)
    setEditedComment(comment.text)
    setInitialComment(comment.text)
  }

  function saveEditComment(cid){
    // Find the comment with the specified cid

    const updatedData = {
      ...updatedBlog
    };

    const commentToUpdate = updatedData.comments.find(
      (comment) => comment.cid === cid
    );

    // If the comment with the given cid is found, update its likes
    if (commentToUpdate) {
        commentToUpdate.text = editedComment // Increment the likes by one
        commentToUpdate.edited = true;//set edited tag to true
    }

    console.log(updatedData)

    fetch(blogUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
      })
      .then(() => {
    
      // Update the state with the new comments to trigger a re-render
      setUpdatedBlog(updatedData);
      setIsEditing(null);
      setEditedComment(null);
      setInitialComment(null);
      })
      .catch((error) => {
      console.error("Error:", error);
      });

  }


  function addCommentLike(cid){
    // Find the comment with the specified cid
    
    const updatedData = {
      ...updatedBlog
    };

    const commentToUpdate = updatedData.comments.find(
      (comment) => comment.cid === cid
    );

 

    // If the comment with the given cid is found, update its likes
    if (commentToUpdate) {

        //create new copy of user
        const updatedData = {
          ...updatedBlog
        };

        const commentToUpdate = updatedData.comments.find(
          (comment) => comment.cid === cid
        );

      
        commentToUpdate.likes += 1; // Increment the likes by one
          //need to add cid to user data
         

        
          
          
        
      


        //update user info in db
        fetch(blogUrl, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
          })
          .then(() => {
        
          // Update the state with the new comments to trigger a re-render
          setUpdatedBlog(updatedData);
          })
          .catch((error) => {
          console.error("Error:", error);
          });
        
    }

   
    


    
  }

  //returns true or false if comment is liked by user
  function isLiked(cid){
    
    const commentToUpdate = user.likedComments.find(
      (comment) => comment === cid
    );

    return commentToUpdate != null
    
  }

  return (
    <div className="comments-container">
      

      { isPending ? 
        <div className="circle-progress">
            <CircularProgress color="primary"/>
        </div>
        
       : 
       
       
        <div>
            <h4>Comments</h4>
            <input
                type="text"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={() => addComment(comment)}>Submit</button>
        </div>}

        
      <div className="comment-section">
        
      
        {[...updatedBlog.comments].reverse().map((comment, index) => (
            
            <div className="comment" 
                    key={index} 
                    onMouseEnter={()=>setHoveredCommentIndex(index)}
                    onMouseLeave={()=>setHoveredCommentIndex(null)}>
                <div className="comment-header-container">
                <div className="comment-header">
                    <h4>{comment.username}</h4>
                    <p>{formatDistanceToNow(new Date(comment.date), { addSuffix: true })}</p>
                    {comment.edited &&  <p>(edited)</p>}
                </div>
               
                
                {hoveredCommentIndex === index && (
                  <BasicPopover  handleDelete = {() => delComment(comment.cid)} handleEdit ={()=>editComment(comment)}/>
                )}

                </div>

                <div className="comment-body">
                    {!(isEditing === comment.cid )?  <p>{comment.text}</p> : 
                    <div>
                      <input 
                        value={editedComment}
                        required
                        onChange={(e)=>setEditedComment(e.target.value)}
                        >
                      </input>
                      <div className="editButtonContainer">
                        <button onClick={()=>setIsEditing(null)}>Cancel</button>
                        {!(initalComment === editedComment) ? 
                          <button onClick={()=>saveEditComment(comment.cid)}>Save</button> : 
                          <button style={{backgroundColor:'lightgray'}} disabled>Save</button>}
                      </div>
                      
                    </div>
                    }
                </div>
                
                {!(isEditing === comment.cid) && <div className="comment-interactions">
                  <div className="comment-likes">

                    {user && (!isLiked(comment.cid) ? <ThumbUpOutlinedIcon onClick={()=>addCommentLike(comment.cid)} className="thumb-up" fontSize="small" />:
                    <ThumbUpIcon onClick={()=>addCommentLike(comment.cid)} className="thumb-up" fontSize="small"/>)}


                    {comment.likes !== 0 ? (
                      <p>{comment.likes}</p>
                      
                   
                  ) : null}
                    
                  </div>
                  <div className="comment-likes">
                  <ThumbDownOutlinedIcon className="thumb-down" fontSize="small"/>
                  </div>
                </div>}
                
                
        
            </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
