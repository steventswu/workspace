import React from 'react';
import { Row, Col as Column, Slider, Button } from 'antd';
import numeral from 'numeral';
import ImageSet from 'src/components/ImageSet';
import { eth } from 'src/assets/home';
import { I18n } from 'react-i18next';
import styles from './1.main.less';

class InvestmentSimulator extends React.PureComponent {
  state = { amount: 0, start: '---', end: '---' };

  changeAmount = value => this.setState({ amount: value / 100 * 10000 });

  changeTenor = ([start, end]) => this.setState({ start, end });

  render() {
    const { content, earn: { percent = 0.2, amount = 200 } = {} } = this.props;
    return (
      <span className={styles.investment_container}>
        <h2>{content.amount_title}</h2>
        <Slider tipFormatter={null} onChange={this.changeAmount} />
        <I18n ns={['common']}>
          {t => <p>{t('cap_value', { value: numeral(this.state.amount).format('0,0') })}</p>}
        </I18n>
        <h2>{content.tenor_title}</h2>
        <Slider tipFormatter={null} range onChange={this.changeTenor} />
        <I18n ns={['common']}>{t => <p>{t('start_end', this.state)}</p>}</I18n>
        <Row gutter={8} className={styles.return_container}>
          <Column xs={{ span: 3 }} xl={{ span: 2 }}>
            =
          </Column>
          <Column xs={{ span: 21 }} xl={{ span: 6 }}>
            <div>
              {numeral(percent).format('0%')}
              <span className={styles.label}>{content.return}</span>
            </div>
          </Column>
          <Column xs={{ span: 21, push: 3 }} xl={{ span: 14 }}>
            <div>
              {amount}
              <ImageSet {...eth} alt="ETH" style={{ margin: 5 }} />
              <span className={styles.label}>{content.earn}</span>
            </div>
          </Column>
        </Row>
      </span>
    );
  }
}

export default ({ onAction, content }) => (
  <main className={styles.main}>
    <Row className={styles.intro} gutter={48}>
      <Column xs={24} lg={{ span: 10 }} style={{ marginBottom: 24 }}>
        <div className={styles.title_container}>
          <h1>{content.title}</h1>
          <p>{content.description[0]}</p>
          <p>{content.description[1]}</p>
          {content.description[2]}
        </div>
      </Column>
      <Column xs={24} lg={{ span: 13, push: 1 }} style={{ marginBottom: 24 }}>
        <InvestmentSimulator content={content.investment_simulator} />
      </Column>
    </Row>
    <Row className={styles.start}>
      <Column xs={{ span: 20, push: 2, pull: 2 }} lg={{ span: 9, push: 7, pull: 7 }}>
        <Button style={{ height: 62 }} type="primary" onClick={onAction}>
          Get Started
        </Button>
      </Column>
    </Row>
  </main>
);
