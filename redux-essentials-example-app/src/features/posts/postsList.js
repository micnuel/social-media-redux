import React, {useEffect} from 'react';
import {useSelector,useDispatch } from 'react-redux';

import {PostAuthor} from '../users/postAuthor'
import {TimeAgo} from './timeAgo'
import {Link} from 'react-router-dom';
import {ReactionButtons} from './reactionButtons';
import {selectAllPosts, fetchPosts,selectPostById, selectPostIds} from './postsSlice';

let PostExcerpt = ({ postId }) => {
    const post = useSelector((state) => selectPostById(state, postId))
  
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content.substring(0, 100)}</p>
  
        <ReactionButtons post={post} />
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
      </article>
    )
  }

  //PostExcerpt = React.memo(PostExcerpt);

  
export const PostList = () =>{
    const dispatch = useDispatch();
    const orderedPostIds = useSelector(selectPostIds)
    //const posts = useSelector(state => state.posts)
    const posts = useSelector(selectAllPosts)

    const postStatus = useSelector(state=> state.posts.status)
    const error = useSelector(state => state.posts.error)

    useEffect(()=> {
        if(postStatus ==='idle'){
            dispatch(fetchPosts())
        }
    }, [postStatus,dispatch])

    let content;

    if(postStatus ==='loading'){
        content = <div className="loaded"> Loading...</div>

    }else if (postStatus==='succeeded'){
       /*  const orderedPosts =posts.slice().sort((a,b)=>
        b.date.localeCompare(a.date)) */
        content = orderedPostIds.map(postId =>(
            <PostExcerpt key ={postId} postId ={postId} />
        ))
    } else if(postStatus==='failed'){
        content= <div> {error}</div>
    }

    // the post on the array have no date, so you wanna sort em?
   //const orderedPosts = posts.slice().sort((a,b) =>b.date.localeCompare(a.date))

    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )
    
}
