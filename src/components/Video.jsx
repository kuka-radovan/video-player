import React, { PropTypes } from 'react';

const Video = props => (
  <video controls>
    <source src={props.src} />
  </video>
);

Video.propTypes = {
  src: PropTypes.string.isRequired
};

export default Video;
