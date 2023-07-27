import './App.css';
import { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import { onLoginStatusChange } from './modules/authManager';
import ApplicationViews from './components/ApplicationViews';
import firebase from 'firebase';
import Header from './components/Header';
import { getUserDetailsById } from './modules/userManager';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
    console.log('logged in')
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      console.log('logged in')
      getUserDetailsById(firebase.auth().currentUser.uid).then(setUser);
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);

  // The "isLoggedIn" state variable will be null until //  the app's connection to firebase has been established.
  //  Then it will be set to true or false by the "onLoginStatusChange" function
  if (isLoggedIn === null) {
    // Until we know whether or not the user is logged in or not, just show a spinner
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <div className="App">
      <Router>

        <Header isLoggedIn={isLoggedIn} user={user} />
        <ApplicationViews isLoggedIn={isLoggedIn} />
      </Router>
    </div>
  );
}

export default App;