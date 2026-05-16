import React from 'react';
import{Grid} from 'react-loader-spinner';
export default function Loading() {
  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center'>
      <Grid size={3} color={'blue'}/>
    </div>
  )
}
