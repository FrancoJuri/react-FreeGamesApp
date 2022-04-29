import React, { useContext } from 'react';
import { context } from '../createContext';
import NoNotificationsDiv from './NoNotificationsDiv';
import NotificationDiv from './NotificationDiv';
import { firebase, usersRef } from '../firebase/firebase-config';
import Swal from 'sweetalert2';

const NotificationsScreen = () => {

    const currentUser = firebase.auth().currentUser;

    const { notifications, unseenNotifications, setUnseenNotifications } = useContext(context);

    const handleMarkAsRead = () => {  
        notifications.forEach(el => {
            const followingCopy = el.following.filter(el => el.uid !== currentUser.uid);
            const notificationObj = el.following.filter(el => el.uid === currentUser.uid)[0];
            usersRef.doc(el.docId).update({
                following: [...followingCopy, {
                    date: notificationObj.date,
                    uid: notificationObj.uid,
                    viewed: true,
                }]
            }).then(() => {
                setUnseenNotifications(0);
            }).catch((err) => {
                Swal.fire('An error has occurred marking a notification as read, try again later', '', 'error');
            })
            
        })
    }
    
    return (
        <div className='mt-5'>
            <div className='card text-white bg-dark mb-5'>

                <div className='card-header montserrat-font' style={{borderBottomColor: 'rgb(81, 81, 81)'}}>
                    <h1 className='d-flex justify-content-center align-items-center gap-md-4 gap-3 my-2 notifications-h1'>
                        Notifications
                        {
                            (unseenNotifications >= 1)
                            &&
                            <span className='d-flex justify-content-center align-items-center bg-primary notification-circle'>
                                {
                                    (unseenNotifications > 99)
                                    ?
                                    "99+"
                                    :
                                    unseenNotifications
                                }
                            </span>
                        }
                    </h1>
                </div>

                <div className={`${(notifications.length) && 'notifications-container'} card-body p-0`}>

                    {
                        (!notifications.length)
                        &&
                        <NoNotificationsDiv />
                    }

                    {
                        (notifications.length >= 1)
                        &&
                        notifications.map((el, index) => (
                            <NotificationDiv key={index} el={el} />
                        ))
                    }

                </div>

                {
                    (notifications.length >= 1 && unseenNotifications >= 1)
                    &&
                    <div className='card-footer d-flex justify-content-center align-items-center quicksand-font'>
                        <button className='btn btn-primary' style={{transition: 'all 270ms'}} onClick={handleMarkAsRead}>
                            Mark all as read
                        </button>
                    </div>
                }

            </div>
        </div>
    )
}

export default NotificationsScreen;
