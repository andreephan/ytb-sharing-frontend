// src/components/Notification.js
import React, { useState, useEffect } from 'react';
import { app } from '../firebase';
import { getDatabase, ref, onValue, set } from 'firebase/database';

const Notification = () => {
  const [message, setMessage] = useState('');
  const db = getDatabase(app);

  useEffect(() => {
    const notificationRef = ref(db, 'notifications');
    onValue(notificationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessage(data.message);
        set(ref(db, 'notifications'), null);
      }
    });
  }, []);

  return (
    message && (
      <div class="alert alert-warning alert-dismissible fade show" role="alert" style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000 }}>
        {message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={() => setMessage('')}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  );
};

export default Notification;
