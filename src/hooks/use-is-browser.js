// Check if window is defined (so if in the browser or in node.js). 
// See Troubleshooting: https://www.gatsbyjs.com/docs/debugging-html-builds/#how-to-check-if-window-is-defined
import { useRef } from "react";

const useIsBrowser = () => {
  const isBrowserRef = useRef(typeof window !== "undefined");
  return isBrowserRef.current;
};

export default useIsBrowser;
