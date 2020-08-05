import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import {client} from '../../api/client';


const notificationAdapter = createEntityAdapter({
    sortComparer: (a,b) => b.date.localeCompare(a.date)
})
export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, {getState}) =>{
        const allNotifications = selectAllNotifications(getState())
        const [latestNotification] = allNotifications
        const latestTimestamp = latestNotification?latestNotification.date: ''
        const response = await client.get(
            `/fakeApi/notifications?since=${latestTimestamp}`

        )

        return response.notifications
     }
)

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState:notificationAdapter.getInitialState(),
    reducers:{
        allNotificationsRead(state,action){
            Object.values(state.entities).forEach(notification =>{
                notification.read =true
            })
        }
    },
    extraReducers:{
        [fetchNotifications.fulfilled]: (state,action) =>{
            Object.values(state.entities).forEach(notification =>{
                notification.isNew =!notification.read
            })
            notificationAdapter.upsertMany(state,action.payload)
        }
    }
})

export default notificationsSlice.reducer
export const {allNotificationsRead} = notificationsSlice.actions
export const{
    selectAll:selectAllNotifications
} = notificationAdapter.getSelectors(state => state.notifications)