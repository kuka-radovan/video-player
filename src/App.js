import React, { Component } from 'react';

import Video from './components/Video';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Video
          src={`${process.env.PUBLIC_URL}/oceans.mp4`}
          seekRanges={[[0.2, 0.4], [0.5, 0.6], [0.7, 0.9]]}
        />
      </div>
    );
  }
}

export default App;
