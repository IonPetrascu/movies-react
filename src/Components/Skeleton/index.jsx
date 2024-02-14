import React from 'react';
import ContentLoader from 'react-content-loader';

function Skeleton() {
  return (
    <ContentLoader
      speed={2}
      width={198}
      height={297}
      viewBox="0 0 198 297"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="18" ry="18" width="198" height="297" />
      <rect x="11" y="247" rx="11" ry="11" width="77" height="24" />
    </ContentLoader>
  );
}

export default Skeleton;
