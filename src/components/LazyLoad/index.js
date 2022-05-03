import React from "react";
import "./styles.css";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const registerObserver = (ref, setShowImage) => {
  const observer = new IntersectionObserver((enteries, observer) => {
    enteries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      setShowImage(true);
      observer.disconnect();
    });
  });
  observer.observe(ref);
};

export default function LazyLoad({ styleClass, src, alt }) {
  const [showImage, setShowImage] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    registerObserver(imageRef.current, setShowImage);
  }, []);

  if (showImage) {
    return <img className={"image-style " + styleClass} src={src} alt={alt} />;
  }
  return <span ref={imageRef} className={"image-style " + styleClass} />;
}
