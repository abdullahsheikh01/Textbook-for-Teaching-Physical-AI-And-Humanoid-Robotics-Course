import React from 'react';
import styles from './AiHelpButton.module.css';

const AiHelpButton = ({ onClick }) => {
  return (
    <button className={styles.aiHelpButton} onClick={onClick}>
      AI HELP
    </button>
  );
};

export default AiHelpButton;
