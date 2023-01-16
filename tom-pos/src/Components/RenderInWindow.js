//Original code from rob-gordon https://stackoverflow.com/questions/47574490/open-a-component-in-new-window-on-a-click-in-react 
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

const RenderInWindow = ({children, title, setPrintFlag}) => {
    const [container, setContainer] = useState(null);
    const newWindow = useRef(null);
  
    useEffect(() => {
      // Create container element on client-side
      setContainer(document.createElement("div"));
    }, []);
  
    useEffect(() => {
      // When container is ready
      if (container) {
        // Create window
        newWindow.current = window.open(
          "",
          title,
          "width=300,height=auto,left=200,top=200"
        );
        // Append container
        newWindow.current.document.body.appendChild(container);
  
        // Save reference to window for cleanup
        const curWindow = newWindow.current;
  
        // Return cleanup function
        return () => {
          setPrintFlag(false);
          curWindow.close()
        };
      }
    }, [container]);
  
    return container && createPortal(children, container);
};

export default RenderInWindow;