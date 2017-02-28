import React, { PropTypes } from 'react';
import './controls.css';

const Controls = ({ seekRanges, videoPosition, onChange, onNextBtnClick, currentSeekRangeIndex }) => (
  <div className="video-controls">
    <button type="button" className="next-range-btn" onClick={onNextBtnClick}>></button>

    <div className="seek-wrapper">
      <div className="seek-ranges-wrapper">
        <div className="seek-ranges-inner">
          {
            seekRanges.map((seekRange, index) => {
              const color = currentSeekRangeIndex === index ? '#0e97d8' : '#c1c1c1';

              return (
                <div
                  key={`seek_${seekRange[0]}-${seekRange[0]}`}
                  className="seek-range"
                  style={{
                    marginLeft: `${seekRange[0] * 100}%`,
                    width: `${(seekRange[1] - seekRange[0]) * 100}%`,
                    background: color
                  }}
                />
              );
            })
          }
        </div>
      </div>

      <div className="seek-bar-wrapper">
        <input
          type="range"
          className="seek-bar"
          step={1}
          value={videoPosition}
          onChange={e => onChange(e.target.value / 100)}
        />
      </div>
    </div>
  </div>
);

Controls.propTypes = {
  seekRanges: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.number
    )
  ),
  videoPosition: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onNextBtnClick: PropTypes.func.isRequired
};

Controls.defaultProps = {
  seekRanges: []
};

export default Controls;
