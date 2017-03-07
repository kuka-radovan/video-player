import React, { PropTypes } from 'react';

import Controls from './Controls';

import './video.css';

class Video extends React.Component {
  constructor(props) {
    super(props);

    this.updateSeekPosition = this.updateSeekPosition.bind(this);
    this.goToNextRange = this.goToNextRange.bind(this);
    this.goToNearestRange = this.goToNearestRange.bind(this);

    this.currentSeekRangeIndex = null;

    this.state = {
      currentSeekPosition: 0
    };
  }

  componentDidMount() {
    this.video.addEventListener('timeupdate', e => this.updateSeekPosition());
  }

  componentDidUpdate(prevProps, prevState) {
    const videoPosition = Math.round(this.state.currentSeekPosition) / 100;

    this.currentSeekRangeIndex = this.getSeekRangeIndex(videoPosition);
    const currentRange = this.props.seekRanges[this.currentSeekRangeIndex];

    if (currentRange && videoPosition === currentRange[1]) {
      this.updateVideoPosition(currentRange[0]);
    }
  }

  componentWillUnmount() {
    this.video.removeEventListener('timeupdate', e => this.updateSeekPosition());
  }

  updateSeekPosition(value) {
    const val = value || this.video.currentTime;
    this.setState({
      currentSeekPosition: (100 / this.video.duration) * val
    });
  }

  updateVideoPosition(value) {
    const time = this.video.duration * value;

    this.updateSeekPosition(time);
    this.video.currentTime = time;
  }

  getSeekRangeIndex(videoPosition) {
    return this.props.seekRanges.findIndex((range, index) => (
      videoPosition >= range[0] && videoPosition <= range[1]
    ));
  }

  isInRange(position) {
    return this.getSeekRangeIndex(position) >= 0;
  }

  goToNextRange() {
    const nextRange = this.currentSeekRangeIndex !== null ? this.props.seekRanges[this.currentSeekRangeIndex + 1] : 0;

    if (nextRange) {
      this.updateVideoPosition(nextRange[0]);
    } else {
      this.updateVideoPosition(this.props.seekRanges[0][0]);
    }
  }

  goToNearestRange(actualPosition) {
    if (this.isInRange(actualPosition)) {
      this.updateVideoPosition(actualPosition);
    } else {
      let distance = Infinity;
      const nearestRangeStart = this.props.seekRanges.reduce((nearestRangeStart, range) => {
        if (Math.abs(range[0] - actualPosition) < distance) {
          distance = Math.abs(range[0] - actualPosition);

          if (Math.abs(range[1] - actualPosition) < distance) {
            distance = Math.abs(range[1] - actualPosition);
          }

          return range[0];
        }

        return nearestRangeStart;
      }, 0);

      this.updateVideoPosition(nearestRangeStart);
    }
  }

  render() {
    return (
      <div className="video-container">
        <video
          ref={(e) => { this.video = e; }}
          preload="auto"
          autoPlay
          loop
        >
          <source src={this.props.src} />
        </video>

        <Controls
          videoPosition={this.state.currentSeekPosition}
          onNextBtnClick={this.goToNextRange}
          onChange={this.goToNearestRange}
          onMouseDown={() => this.video.pause()}
          onMouseUp={() => this.video.play()}
          seekRanges={this.props.seekRanges}
          currentSeekRangeIndex={this.currentSeekRangeIndex}
        />
      </div>
    );
  }
}

Video.propTypes = {
  src: PropTypes.string.isRequired
};

export default Video;
