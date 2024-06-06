import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import VideoList from './components/VideoList';
import ShareVideo from './components/ShareVideo';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { off, onValue, ref, remove, update} from 'firebase/database';
import { db } from './firebase';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const handleUserUpdate = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  useEffect(() => {
    const notificationRef = ref(db, 'notifications');
    off(notificationRef);
    onValue(notificationRef, (snapshot) => {
      const data = snapshot.val();
      if (data && !data.read) {
        toast.info(data.message);
        remove(notificationRef);
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Header user={user} onUserUpdate={handleUserUpdate} />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/share" element={<ShareVideo />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
