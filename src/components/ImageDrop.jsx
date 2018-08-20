import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

// Handle state in <CreateBlog>
const ImageDrop = props => {
  return (
    <Dropzone
      multiple={false}
      accept="image/*"
      onDrop={props.onImageDrop}>
      <p>Drop an image or click to select a file to upload.</p>
    </Dropzone>
  );
}

export default ImageDrop;