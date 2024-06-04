import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import VideoList from './components/VideoList';
import ShareVideo from './components/ShareVideo';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const handleUserUpdate = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <Router>
      <div className="app">
        <Header user={user} onUserUpdate={handleUserUpdate} />
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/register" element="Register" />
          <Route path="/login" element="Login" />
          <Route path="/share" element={<ShareVideo />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
