import { useState, useRef } from 'react';
import VideoPlayer from './VideoPlayer'; 

function App() {
  const playerRef = useRef(null);
  const [videoLink, setVideoLink] = useState(null);
  const [file, setFile] = useState(null);

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: videoLink
      ? [{ src: videoLink, type: "application/x-mpegURL" }]
      : [],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on("waiting", () => {
      console.log("Player is waiting");
    });
    player.on("dispose", () => {
      console.log("Player will dispose");
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/uploads', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setVideoLink(data.videoUrl); 
      alert("Video successfully uploaded and transcoded");
    } catch (error) {
      console.error('Error uploading the file:', error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-yellow-400 retro-text">Retro Cinema Player</h1>
      
      {/* Form to upload video */}
      <form onSubmit={handleUpload} className="mb-4">
        <input 
          type="file" 
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 text-zinc-900"
        />
        <button 
          type="submit" 
          className="px-6 py-2 bg-yellow-500 text-zinc-900 font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition-all"
        >
          Upload & Transcode Video
        </button>
      </form>

      {videoLink && (
        <div className="border-4 border-yellow-500 w-full max-w-screen-lg mb-4">
          <VideoPlayer
            options={videoPlayerOptions}
            onReady={handlePlayerReady}
          />
        </div>
      )}

      {videoLink && (
        <button 
          onClick={() => playerRef.current?.play()} 
          className="mt-4 px-6 py-2 bg-yellow-500 text-zinc-900 font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition-all"
        >
          Play Movie
        </button>
      )}
    </div>
  );
}

export default App;
