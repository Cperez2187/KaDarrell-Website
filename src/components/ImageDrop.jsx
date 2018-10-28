import React from 'react';
import Dropzone from 'react-dropzone';

// Handle state in <CreateBlog>
const ImageDrop = ({ onImageDrop }) => {
  return (
    <Dropzone
      multiple={false}
      accept="image/*"
      onDrop={onImageDrop}
    >
      <p style={{ textAlign: 'center' }}>Drop an image or click to select a file to upload.</p>
    </Dropzone>
  );
}

export default ImageDrop;