import React from 'react';
import {useSelector } from 'react-redux';

import {PostAuthor} from '../users/postAuthor'
import {Link} from 'react-router-dom';

export const PostList = () =>{
    const posts = useSelector(state => state.posts)
    const renderedPosts = posts.map(post =>(
        <article className="post-excerpt">
            <h3> {post.title}</h3>

            <PostAuthor userId={post.user} />

            <p> {post.content.substring(0,100)}</p>
            <Link to= {`/posts/${post.id}`} 
            className="button muted-button">
            View Post
            </Link>
        </article>
    ))

    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}