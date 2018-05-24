import React from 'react';
import { connect } from 'dva';
import { Form, Button, Checkbox, Row } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';
import Contract from './Contract';

const formItemLayout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
};

@Form.create()
@connect(({ token }) => ({
  checked: token.checked,
}))
export default class Step1 extends React.PureComponent {
  onSubmit = () => {
    this.props.dispatch(routerRedux.push('/token/2'));
  };

  onClickCheck = field => e => {
    const { dispatch, checked } = this.props;
    dispatch({
      type: 'token/updateAcceptTerms',
      payload: {
        ...checked,
        [field]: e.target.checked,
      },
    });
  };

  render() {
    const { checked } = this.props;
    const buttonDisabled = !checked[1] || !checked[2] || !checked[3];
    return (
      <div className={styles.wrapper}>
        <Contract className={styles.contract} />
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout}>
            <Row>
              <Checkbox id="check1" onChange={this.onClickCheck(1)} checked={checked[1]}>
                I hereby agree to the above stated Terms & Conditions
              </Checkbox>
            </Row>
            <Row>
              <Checkbox id="check2" onChange={this.onClickCheck(2)} checked={checked[2]}>
                I have read and agree to Section 5 of the Terms & Conditions
              </Checkbox>
            </Row>
            <Row>
              <Checkbox id="check3" onChange={this.onClickCheck(3)} checked={checked[3]}>
                I am NOT from a country in which ICO or transaction of tokens might be prohibited by
                laws, including but not limit to China and the United States.
              </Checkbox>
            </Row>
            <Button type="primary" onClick={this.onSubmit} disabled={buttonDisabled}>
              Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
