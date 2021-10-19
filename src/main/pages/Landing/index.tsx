import React, { VFC } from 'react';

const Landing: VFC = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
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
