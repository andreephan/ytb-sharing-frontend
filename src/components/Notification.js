// src/components/Notification.js
import React, { useState, useEffect } from 'react';
import CableApp from '../cable';

const Notification = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const subscription = CableApp.cable.subscriptions.create('NotificationChannel', {
      received(data) {
        setMessage(data.message);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
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
