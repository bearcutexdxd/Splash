import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ProgressBar({ percentage, image }) {
  return (
    <div className="w-8">

      <CircularProgressbarWithChildren
        value={percentage}
        styles={{
          trail: {
            // Trail color
            stroke: 'white',
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          },
          path: {
            // Path color
            stroke: '#7ee022',
          },
        }}
      >
        {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
        <img style={{ width: 32 }} src={image} alt="" />
      </CircularProgressbarWithChildren>
    </div>
  );
}
