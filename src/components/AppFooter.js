import React from 'react';
import { Icon } from 'antd';
import GlobalFooter from './GlobalFooter';

const style = { margin: 15 };

const iconLinkStyle = { color: 'rgba(0, 0, 0, 0.45)' };

const iconStyle = { margin: '20px 10px', fontSize: 25 };

export default function AppFooter() {
  return (
    <GlobalFooter
      copyright={
        <React.Fragment>
          <div style={style}>
            <a
              style={style}
              target="_blank"
              rel="noopener noreferrer"
              href="https://storage.googleapis.com/tixguru/terms.pdf"
            >
              Legal / Terms / Privacy
            </a>
            <a
              style={style}
              target="_blank"
              rel="noopener noreferrer"
              href="https://medium.com/tixguru/cap-faq-7f5a5439a72f"
            >
              FAQ
            </a>
          </div>
          Copyright <Icon type="copyright" /> 2018 TIXGURU
          <div>
            <a
              style={iconLinkStyle}
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/tixguru"
            >
              <Icon type="twitter" style={iconStyle} />
            </a>
            <a
              style={iconLinkStyle}
              target="_blank"
              rel="noopener noreferrer"
              href="https://medium.com/tixguru/cap/home"
            >
              <Icon type="medium" style={iconStyle} />
            </a>
            <a
              style={iconLinkStyle}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.youtube.com/channel/UCw-PfsMFAN02gxw0D6D7ovA"
            >
              <Icon type="youtube" style={iconStyle} />
            </a>
          </div>
        </React.Fragment>
      }
    />
  );
}
