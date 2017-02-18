import React, { Component } from 'react';

import Video from './components/Video';

class App extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <div>
        <Video
          src={`${process.env.PUBLIC_URL}/oceans.mp4`}
        />
      </div>
    );
  }
}

export default App;
