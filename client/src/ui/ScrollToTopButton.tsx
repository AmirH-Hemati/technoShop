import { useEffect, useState } from "react";

import { ArrowUp2 } from "iconsax-reactjs";

import { motion } from "motion/react";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handelScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visible && (
        <motion.button
          onClick={handelScrollToTop}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="from-primary fixed right-5 bottom-20 z-[10000] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-linear-to-t to-[#9B4DFF] text-white shadow-lg md:bottom-5"
        >
          <ArrowUp2 size={24} />
        </motion.button>
      )}
    </>
  );
}

export default ScrollToTopButton;
