import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import {firebase} from '../firebase/firebaseConfig'
import JournalScreen from '../components/journal/JournalScreen';
import AuthRouter from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

const AppRouter = () => {

    const dispatch = useDispatch()

    const [ checking, setChecking ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged(async (user) => {
            //user?.uid existe ejecutara el if
            // ? evalua si el objeto user tienen algo que sea uid
            if (user?.uid) {
                dispatch( login( user.uid, user.displayName ) )
                setIsLoggedIn( true )
                dispatch( startLoadingNotes( user.uid ) );

            } else {
                setIsLoggedIn( false )
            }
            //checa si ya hay un usuario logeado
            setChecking( false )
        })

    }, [dispatch, setChecking, setIsLoggedIn])

    //espera el logeo del usuario
    if ( checking ) {
        return(
            <h1>Espere...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        isAuthenticated={ isLoggedIn }
                        path='/auth'
                        component={ AuthRouter }
                    />            

                    <PrivateRoute
                        exact
                        isAuthenticated={ isLoggedIn }
                        path='/'
                        component={ JournalScreen }
                    />
                    <Redirect to="/auth/login"/>
                </Switch>                
            </div>
        </Router>
    )
}

export default AppRouter
