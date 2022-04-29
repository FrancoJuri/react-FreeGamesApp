import React, { useReducer, useState } from 'react';
import { context } from './createContext';
import { authReducer } from './reducers/authReducer';
import { uiReducer } from './reducers/uiReducer';
import AppRouter from './routers/AppRouter';

const App = () => {

    const [stateAuth, dispatchAuth] = useReducer(authReducer, {});
    const [stateUi, dispatchUi] = useReducer(uiReducer, {
        loading: false, 
        msgError: null,
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unseenNotifications, setUnseenNotifications] = useState(0);

    return (
        <context.Provider 
            value={{
                stateAuth, 
                dispatchAuth, 
                stateUi, 
                dispatchUi, 
                isLoggedIn, 
                setIsLoggedIn, 
                notifications, 
                setNotifications,
                unseenNotifications,
                setUnseenNotifications,
            }}
        >
            <AppRouter />
        </context.Provider>
    )
}

export default App;
