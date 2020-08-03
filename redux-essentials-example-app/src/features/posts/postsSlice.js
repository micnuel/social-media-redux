import {createSlice, nanoid,createAsyncThunk} from '@reduxjs/toolkit';
import {client} from '../../api/client';

const initialState ={
    posts:[],
    status:'idle',
    error:null,
}

//API fetch

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async()=>{
const response = await client.get('/fakeApi/posts')
return response.posts
})




const postsSlice = createSlice({
    name:'posts',
    initialState:initialState,
    reducers:{

       /*  postAdded: (state,action) => {
            state.push(action.payload);
        }, */

        reactionAdded(state,action){
            const {postId, reaction} = action.payload;
            const existingPost = state.posts.find(post => post.id ===postId)

            if(existingPost){
                existingPost.reactions[reaction]++
            }
        },
        postAdded:{
            reducer(state,action) {
            state.posts.push(action.payload)
            },
        prepare(title,content, userId){
            return{
                payload:{
                    id:nanoid(),
                    title:title,
                    content:content,
                    user:userId,
                    date:new Date().toISOString(),
                }
            }
        }
    },

        postUpdated (state,action){
            const {id, title, content} = action.payload
            const existingPost = state.posts.find(post=>post.id ===id)

            if(existingPost){
                existingPost.title = title
                existingPost.content = content
            }
        },
    },

        extraReducers:{
            [fetchPosts.pending]: (state,action) =>{
                state.status ='loading'
            },

            [fetchPosts.fulfilled]:(state, action) =>{
                state.status ='succeeded'
                state.posts = state.posts.concat(action.payload)
            },

            [fetchPosts.rejected] : (state, action) =>{
                state.status ='failed'
            },
        }

})

//selectors extraction
export const selectAllPosts = state => state.posts.posts;

export const selectPostById =(state, postId) => state.posts.posts.find(post=>
    post.id === postId);
export const {postAdded,postUpdated, reactionAdded}  = postsSlice.actions;

export default postsSlice.reducer
