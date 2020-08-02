import  React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {nanoid } from '@reduxjs/toolkit';

import {postAdded}  from './postsSlice';
import { useHistory } from 'react-router-dom';

export const AddPostForm = () =>{
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const[userId, setUserId] = useState('');
    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);

    const dispatch = useDispatch();
    const users = useSelector(state=> state.users)

    const onPostClicked =() =>{
        if(title && content){
            dispatch(postAdded(

                title,content

                /*id:nanoid(),
                title:title,
                content:content*/
            ))

        setContent('')
        setTitle('')

        //How do you set the select option to empty??
        //setUserId('')
        }
    }

    const canSave = Boolean(title) &&Boolean(content) && Boolean(userId)

    const usersOption = users.map(user=>(
        <option key={user.id} value ={user.id}>
            {user.name}
        </option>
    ))

const onAuthorChanged =(e) =>setUserId(e.target.value)



return(
    <section>
        <h2> Add a New post</h2>
        <form>
            <label htmlFor="postTitle"> Post Title:</label>
            <input
            type="text"
            id ="postTitle"
            name ="postTitle"
            value={title}
            onChange ={onTitleChange}
            />
            <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOption}
                </select>
            <label htmlFor="postContent"> Content:</label>
            <textarea
            id ="postContent"
            name ="postContent"
            value={content}
            onChange ={onContentChange}
            />

            <button type="button" onClick={onPostClicked}> Save Post</button>
        </form>
    </section>
)
}