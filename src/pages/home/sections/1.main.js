import React from 'react';
import { Row, Col as Column, Slider, Button } from 'antd';
import numeral from 'numeral';
import ImageSet from 'src/components/ImageSet';
import { eth } from 'src/assets/home';
import { I18n } from 'react-i18next';
import throttle from 'lodash/throttle';
import { queryIndexOverall } from 'src/services/data';
import styles from './1.main.less';

const initStart = new Date('2017-01-01 0:00').valueOf();
const initEnd = new Date('2018-06-30 23:59:59').valueOf();
const calculateTimestamp = percentage => initStart + (initEnd - initStart) * (percentage / 100);

class InvestmentSimulator extends React.PureComponent {
  state = { amount: 100, start: initStart, end: initStart, earn: {} };

  query = throttle(() => {
    queryIndexOverall(this.state).then(data => this.setState({ earn: data }));
  }, 500);

  changeAmount = value => this.setState({ amount: 100 + value / 100 * (10000 - 100) }, this.query);

  changeTenor = ([start, end]) =>
    this.setState({ start: calculateTimestamp(start), end: calculateTimestamp(end) }, this.query);

  render() {
    const { content } = this.props;
    const { percentage, amount } = this.state.earn;
    return (
      <span className={styles.investment_container}>
        <h2>{content.amount_title}</h2>
        <Slider tipFormatter={null} onChange={this.changeAmount} />
        <I18n ns={['common']}>
          {t => <p>{t('cap_value', { value: numeral(this.state.amount).format('0,0') })}</p>}
        </I18n>
        <h2>{content.tenor_title}</h2>
        <Slider tipFormatter={null} range onChange={this.changeTenor} />
        <I18n ns={['common']}>
          {t => (
            <p style={{ letterSpacing: 2 }}>
              {t('start_end', {
                start: new Date(this.state.start).toLocaleDateString('en'),
                end: new Date(this.state.end).toLocaleDateString('en'),
              })}
            </p>
          )}
        </I18n>
        <Row gutter={8} className={styles.return_container}>
          <Column span={2}>=</Column>
          <Column span={21}>
            <div>
              {percentage ? numeral(percentage).format('0%') : 0}
              <span className={styles.label}>{content.return}</span>
            </div>
          </Column>
          <Column span={21} push={2}>
            <div>
              {amount ? numeral(amount).format('0') : 0}
              <ImageSet {...eth} alt="ETH" style={{ marginLeft: 8 }} />
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
