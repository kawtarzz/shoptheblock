import './App.css';
import { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import { onLoginStatusChange, getUserDetails } from './modules/authManager';
import ApplicationViews from './components/ApplicationViews';
import Header from './components/Header';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState({ id: 0, fullName: "", email: "", password: "", profilePic: "" });
  // once connection is established set to true or false by the "onLoginStatusChange" function
  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
    console.log("isLoggedIn", isLoggedIn)
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getUserDetails(firebase.auth().currentUser.uid).then(user => setUser(user));
    }
  }, [isLoggedIn])

  // The "isLoggedIn" state variable will be null until //  the app's connection to firebase has been established.
  if (isLoggedIn === null) {
    // Until we know whether or not the user is logged in or not, just show a spinner
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} user={user} />

        <ApplicationViews isLoggedIn={isLoggedIn} user={user} />
      </Router>
    </div>
  );
}

export default App;