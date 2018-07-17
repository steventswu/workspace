import React from 'react';
import { Card } from 'antd';
import classNames from 'classnames';

import styles from './PortfolioCard.less';
import PortfolioItem from './PortfolioItem';

export default function PortfolioCard({ data = {}, selected, onSelect, inactive }) {
  const cardStyle = inactive
    ? styles.cardInactive
    : classNames(styles.card, { [styles.cardSelected]: selected });
  return (
    <Card className={cardStyle} hoverable title={data.title} onClick={() => onSelect(data.key)}>
      <div className={styles.subtitle}>
        <h3 className={styles.type}>{data.type}</h3>
        <hr />
        <h3>{data.description}</h3>
      </div>
      <div style={{ marginBottom: 20 }}>
        {Object.keys(data.info).map(key => (
          <PortfolioItem key={key} title={data.info[key].title} content={data.info[key].content} />
        ))}
      </div>
      <div>
        {Object.keys(data.meta).map(key => (
          <PortfolioItem
            key={key}
            title={data.meta[key].title}
            content={data.meta[key].content}
            secondary
          />
        ))}
      </div>
    </Card>
  );
}
