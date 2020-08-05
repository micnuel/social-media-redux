import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {formatDistanceToNow, parseISO} from 'date-fns';
import {selectAllNotifications,allNotificationsRead}  from './notificationsSlice';
import {selectAllUsers} from '../users/usersSlice';
import classnames from 'classnames'

export const NotificationsList = () => {
    const notifications = useSelector(selectAllNotifications)
    const users = useSelector(selectAllUsers)
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(allNotificationsRead())
    })
    const renderedNotifications = notifications.map(notification =>{
            const date = parseISO(notification.date)
            const timeAgo = formatDistanceToNow(date)
            const userL = users.find(user => user.id ===notification.user)?
            users.find(user => user.id === notification.user):{
                name: 'Unknown User'}

            const notificatonClassname =classnames('notification', {
                new:notification.isNew
            })
            return (
                <div key={notification.id} className={notificatonClassname}>
                  <div>
                    <b>{userL.name}</b> {notification.message}
                  </div>
                  <div title={notification.date}>
                    <i>{timeAgo} ago</i>
                  </div>
                </div>
              )
            
        }
    )
    return (
        <section className="notificationsList">
          <h2>Notifications</h2>
          {renderedNotifications}
        </section>
      )

}