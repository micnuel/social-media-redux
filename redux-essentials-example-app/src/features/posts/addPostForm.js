import  React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';

import {addNewPost}  from './postsSlice';
import { useHistory } from 'react-router-dom';
import { selectAllUsers } from '../users/usersSlice';

export const AddPostForm = () =>{
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const[userId, setUserId] = useState('');
    const[addRequestStatus, setAddRequestStatus] = useState('idle')
    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);

    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers)

    const canSave = [title,content,userId].every(Boolean) && 
    addRequestStatus ==='idle';
    const onSavePostClicked = async () =>{
        if(canSave){
            try{
                setAddRequestStatus('pending');
                const resultAction = await dispatch(
                    addNewPost({title,content,user:userId})
                );
                unwrapResult(resultAction);
                setTitle('');
                setContent('');
                setUserId('');
            }

            catch(err){
                console.log('Failed to save the post', err)
            } finally{
                setAddRequestStatus('idle');
            }
        }
    }



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

            <button type="button" onClick={onSavePostClicked}> Save Post</button>
        </form>
    </section>
)
}