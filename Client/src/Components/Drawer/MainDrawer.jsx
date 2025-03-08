import React, { useEffect, useRef } from 'react';
import {motion, AnimatePresence} from 'framer-motion';

function MainDrawer({ children, DrawerOpen, closeDrawer, position = 'right'}) {
  const drawer = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawer.current && !drawer.current.contains(event.target)) {
        closeDrawer();
      }
    };

    if (DrawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [DrawerOpen, closeDrawer]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeDrawer();
      }
    };

    if (DrawerOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [DrawerOpen, closeDrawer]);

  const variants= {
    open: {opacity: 1, x:0},
    close: {x: position === 'right' ? '100%' : '-100%'}
  };

  return (
    <AnimatePresence>
      {/* Drawer Container */}
      {DrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
          layout
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={closeDrawer}
            initial= {{opacity: 0}}
            animate= {{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3, ease: 'linear'}}
          ></motion.div>

          {/* Drawer */}
          <motion.div
            ref={drawer}
            className={`fixed top-0 ${
              position === 'right' ? 'right-0' : 'left-0'
            } h-full w-full sm:w-96 bg-white shadow-xl z-50
            `}
            initial={{x:position === 'right'? '100%' : '-100%'}}
            animate='open'
            exit='close'
            transition={{ duration: 0.3, ease: "linear" }}
            variants={variants}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MainDrawer;