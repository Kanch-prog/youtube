import { useState } from 'react';
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&part=snippet&key=AIzaSyBIfxrnSszLZOCLn-s6SUykjxOLfRdsoHw&maxResults=12`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setVideos(data.items);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  return (
    <div className="App">
      <header>
      <div className="header-left">
        <div className="logo">
            <h1><img src='/youtube/images/logo.png' alt='logo' />YouTube</h1>
        </div>
        </div>
        
        <div className="header-center">          
          <div className="search-bar">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
        
        <div className="header-left">
          <div className="user-section">
            <h2>Login</h2>
           
          </div>
        </div>
      </header>
      <div className="main-content">
        <nav className="left-column">
          <div className="menu">
            <ul>
              <li>Home</li>
              <li>Shorts</li>
              <li>Subscriptions</li>
              <hr />
              <li>History</li>
              <li>Watch Later</li>
              <li>Liked Videos</li>
              <hr />
              <li>Trending</li>
              <li>Music</li>
              <li>Gaming</li>
              <li>Sports</li>
            </ul>
          </div>
        </nav>
        <div className="right-column">
          {videos.map((video) => (            
            <div key={video.id.videoId} className="video">                         
              <iframe
                title={video.snippet.title}
                width="100%"
                height="180px"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <h2>{video.snippet.title}</h2>
              <p>Owner: {video.snippet.channelTitle}</p>
              <p>Time Uploaded: {new Date(video.snippet.publishedAt).toLocaleString()}</p>
            </div>            
          ))}          
        </div>
      </div>
    </div>
  );
}

export default App;
