import React from 'react';
import styles from './index.less';

const Title = ({ title }) => (
  <div className={styles.titleWrapper}>
    <div className={styles.performanceTitle}>{title}</div>
  </div>
);

export default Title;
