import {createSlice, nanoid,createAsyncThunk, createSelector, createEntityAdapter} from '@reduxjs/toolkit';
import {client} from '../../api/client';


const postsAdapter = createEntityAdapter({
    sortComparer:(a,b) => b.date.localeCompare(a.date)
})
const initialState = postsAdapter.getInitialState({
    status: 'idle',
    error:null
})
//API fetch

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async()=>{
const response = await client.get('/fakeApi/posts')
return response.posts
})

export const addNewPost = createAsyncThunk('posts/addNewPost', 
async (initialPost) =>{
    const response = await client.post('fakeApi/posts',{post:initialPost})
    return response.post
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
            const existingPost = state.entities[postId]

            if(existingPost){
                existingPost.reactions[reaction]++
            }
        },
     
        postUpdated (state,action){
            const {id, title, content} = action.payload
            const existingPost = state.entities[id]

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
                postsAdapter.upsertMany(state, action.payload)
            },

            [fetchPosts.rejected] : (state, action) =>{
                state.status ='failed'
            },

            [addNewPost.fulfilled] : postsAdapter.addOne
            
        }

})



//selectors extraction
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors(state=>state.posts);
export const {postAdded,postUpdated, reactionAdded}  = postsSlice.actions;

//moemorized selectors
export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.user ===userId)
)
export default postsSlice.reducer
