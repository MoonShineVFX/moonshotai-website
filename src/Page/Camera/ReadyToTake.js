import React, { useState, useRef } from "react";
import {Camera} from "react-camera-pro";
function ReadyToTake() {
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  return (
    <div>
      
      <div>
        <Camera ref={camera} aspectRatio={3 / 4}/>
        <button onClick={() => setImage(camera.current.takePhoto())} className="bg-gray-400 p-2 rounded-md ">Take photo</button>
        <img src={image} alt='Taken photo'/>
      </div>
    </div>
  )
}

export default ReadyToTake