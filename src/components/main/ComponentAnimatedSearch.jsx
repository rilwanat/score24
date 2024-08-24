import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';

const ComponentAnimatedSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: !isOpen ? 200 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute z-10"
      >
        
        <input
          type="text"
          placeholder="Search..."
          className="px-2 py-1 rounded-xl"
          style={{ transition: 'width 0.3s' }}
        />

      </motion.div>
      <SearchIcon
        onClick={handleToggle}
        className="cursor-pointer text-blue-500 z-20"
        style={{ marginLeft: '10px' }}
      />
    </div>
  );
};

export default ComponentAnimatedSearch;