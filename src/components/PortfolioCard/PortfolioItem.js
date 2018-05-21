import React from 'react';
import classNames from 'classnames';
import styles from './PortfolioItem.less';

export default function PortfolioItem({ title, content, secondary }) {
  return (
    <span className={classNames(styles.item, secondary ? styles.secondary : styles.primary)}>
      <span>{title}</span>
      <span>{content}</span>
    </span>
  );
}
