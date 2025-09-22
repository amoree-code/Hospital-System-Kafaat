import React from "react";
import { PuffLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <div className="loader">
      <PuffLoader
        color="#3bc290"
        loading={true}
        size={250}
        speedMultiplier={1.5}
      />
    </div>
  );
};

export default LoadingScreen;
