import React from 'react';
import terms from 'src/locales/terms.json';

export default ({ className }) => (
  <div className={className}>
    {terms.sales.map((p, i) => {
      /* eslint-disable react/no-array-index-key */
      if (!p) return <br key={i} />;
      return <p key={i}>{p}</p>;
    })}
  </div>
);
