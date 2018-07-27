import React from 'react';

const ImageSet = ({ x1, x2, x3, alt, ...props }) => (
  <img src={x1} srcSet={`${x2} 2x, ${x3} 3x`} alt={alt} {...props} />
);

export default ImageSet;
