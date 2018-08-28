import React, { Component } from 'react';
import { Row, Col as Column, Button, DatePicker } from 'antd';

import styles from './2.calendar.less';

const { RangePicker } = DatePicker;

const content = {
  investing_tenor: {
    title: 'Investing Tenor',
    content: 'Please select an investment tenor to see returns and how we beat the market.',
  },
};

export default class InvestingTenor extends Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
  };

  disabledStartDate = startValue => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    this.onChange('startValue', value);
  };

  onEndChange = value => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  getCalendarContainer = () => {
    return this.rangePicker || document.getElementById('rangePicker');
  };

  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <section>
        <Row className={styles.row}>
          <Column lg={24}>
            <div className={styles.title_container}>
              <h1>{content.investing_tenor.title}</h1>
              <p>{content.investing_tenor.content}</p>
            </div>
          </Column>
        </Row>
        <Row type="flex" justify="center" className={styles.calendar_container}>
          <Column>
            <div id={'rangePicker'}>
              {/* <RangePicker
                open={true}
                getCalendarContainer={this.getCalendarContainer}
                onChange={this.onChange}
              /> */}
              <DatePicker
                getCalendarContainer={this.getCalendarContainer}
                disabledDate={this.disabledStartDate}
                format="YYYY/MM/DD"
                showToday
                value={startValue}
                placeholder="Start"
                onChange={this.onStartChange}
                onOpenChange={this.handleStartOpenChange}
                // style={{ marginRight: 230 }}
              />
              <DatePicker
                getCalendarContainer={this.getCalendarContainer}
                disabledDate={this.disabledEndDate}
                format="YYYY/MM/DD"
                value={endValue}
                placeholder="End"
                onChange={this.onEndChange}
                open={endOpen}
                onOpenChange={this.handleEndOpenChange}
              />
            </div>
          </Column>
        </Row>
        <Row type="flex" justify="center">
          <Column>
            <Button size="large" type="primary" className={styles.start}>
              Submit
            </Button>
          </Column>
        </Row>
      </section>
    );
  }
}
