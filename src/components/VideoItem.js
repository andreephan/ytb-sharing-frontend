import React from 'react';

const VideoItem = ({ video }) => {
  const videoUrl = `https://www.youtube.com/embed/${video.youtube_id}`;
  console.log(video);
  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <iframe
          className='video-thumbnail'
          style={{ width: '100%', height: '100%'}}
          src={videoUrl}
          title={video.title}
          allowFullScreen>
        </iframe>
      </div>
      <div className="col-md-8">
        <h5 className="text-danger">{video.title}</h5>
        <p className="card-text">
          <strong>Shared by:</strong> {video.user}
        </p>
        <p className="card-text">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoItem;
