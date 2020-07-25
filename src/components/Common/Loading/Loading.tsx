import React from 'react';
import { Spinner } from '@class101/ui';
import './Loading.scss';

const Loading = () => {
  return (
    <div className="Loading">
      <Spinner size={100} backgroundColor="skyblue" />
    </div>
  );
};

export default Loading;
