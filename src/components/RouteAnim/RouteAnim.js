import React from 'react';
import {motion} from 'framer-motion';

const pageTransition = {
    duration: .300,
    transition: 'ease-in-out'
  }
  
  const pageVariants = {
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    }
  }

  const RouteAnim = (props) => {
      return (
        <motion.div initial="out" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            {props.children}
        </motion.div>
      )
  }

  export default RouteAnim;
  