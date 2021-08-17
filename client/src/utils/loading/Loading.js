import React from 'react';
import { Spinner } from 'react-bootstrap';
import './Loading.css'

const Loading = () => {
  return (
    <div className="Loadingspin">
    <Spinner animation="border" variant="info" size="lg"/>
    </div>
  );
};

export default Loading