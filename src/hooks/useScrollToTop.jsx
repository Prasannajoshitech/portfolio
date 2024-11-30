// NOTE: This scroll to top is the actual working scroll to to when user clicks on the circle arrow that appears when use scrolls down.
// The other `ScrollToTop` component in components folder is for the default react scroll to top behavior on route visit.

import { useState, useEffect } from "react";
import { FiChevronUp } from "react-icons/fi";

const useScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", scrollToTop);
    return function cleanup() {
      window.removeEventListener("scroll", scrollToTop);
    };
  });

  const scrollToTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", scrollToTop);

  return (
    <>
      <FiChevronUp
        className="scrollToTop"
        onClick={backToTop}
        style={{
          height: 45,
          width: 45,
          borderRadius: 50,
          right: 50,
          bottom: 50,
          display: showScroll ? "flex" : "none",
          padding: 5,
        }}
      />
      {/* <div
        className="scrollToTop bg-green-500 blur-xl z-50 "
        onClick={backToTop}
        style={{
          height: 45,
          width: 45,
          borderRadius: 50,
          right: ["calc(50% - 22.5px)"],
          bottom: 50,
          display: showScroll ? "flex" : "none",
          padding: 5,
          gap: 5,
        }}
      >
        <span>home</span>
        <span>about</span>
        <span>projects</span>
      </div> */}
    </>
  );
};

export default useScrollToTop;
