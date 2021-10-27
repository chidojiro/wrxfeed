import React, { VFC } from 'react';

const Landing: VFC = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <video id="landing-bg-vid" className="fixed inset-0 z-[-1] opacity-20" autoPlay loop muted>
        <source
          src="https://gravity-asset-bucket.s3.us-east-2.amazonaws.com/landing-bg.mp4"
          type="video/mp4"
        />
      </video>
      <h1
        className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
        data-aos="zoom-y-out"
      >
        Gravity
      </h1>
    </div>
  );
};

export default Landing;
