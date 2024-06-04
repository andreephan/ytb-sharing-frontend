import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoItem from './VideoItem';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get('http://localhost:3000/api/v1/videos');
      console.log(response);
      setVideos(response.data);
    };
    fetchVideos();
  }, []);

  return (
    <div className="container mt-4">
      {videos.map(video => (
        <VideoItem video={video} />
      ))}
    </div>
  );
};

export default VideoList;
