import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { redirect } from 'react-router-dom';

const ShareVideo = ({ user }) => {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/videos`, {
        video: { url },
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessage('Video shared successfully!');
      redirect('/');
    } catch (error) {
      setMessage('Error sharing video.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Share a YouTube Movie</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="youtubeUrl">
              <Form.Label>YouTube URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter YouTube URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Share
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ShareVideo;
