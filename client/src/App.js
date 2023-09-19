import './App.css';
import { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import { onLoginStatusChange, getUserDetails } from './modules/authManager';
import ApplicationViews from './components/ApplicationViews';
import Header from './components/Navigation/Header';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState({ id: 0, fullName: "", email: "", profilePic: "" });
  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getUserDetails(firebase.auth().currentUser.uid).then(user => setUser(user));
    }
  }, [])

  if (isLoggedIn === null) {
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