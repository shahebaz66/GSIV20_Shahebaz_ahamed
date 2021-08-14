import React from "react";
import ReactLoading from "react-loading";

function Loader() {
  return (
    <div style={{height:"100vh"}} className="d-flex align-items-center justify-content-center">
     
        <ReactLoading
          type={"spinningBubbles"}
          color={"#357edd"}
          
        />
     
    </div>
  );
}

export default Loader;
