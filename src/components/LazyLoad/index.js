import React , { useRef , useState, useEffect} from "react";
import "./styles.css";
 

const registerObserver = (ref, setShowImage) => {
  const observer = new IntersectionObserver((enteries, observe) => {
    enteries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      setShowImage(true);
      observe.disconnect();
    });
  });
  observe.observe(ref);
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
