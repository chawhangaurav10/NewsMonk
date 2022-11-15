import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Spinner() {
  return (
    <div className="text-center">

    <div  className='my-3 mx-3'>
      <CircularProgress color="warning" />
    </div>
    </div>

  );
}