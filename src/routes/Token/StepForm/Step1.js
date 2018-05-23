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
class Step1 extends React.PureComponent {
  onSubmit = () => {
    this.props.dispatch(routerRedux.push('/app/token/2'));
  };

  onClickCheck = e => {
    const { dispatch, data } = this.props;
    data[e.target.id] = e.target.checked;
    dispatch({
      type: 'token/saveStepFormData',
      payload: data,
    });
  };

  render() {
    const { data } = this.props;
    const buttonDisabled = !data.check1 || !data.check2 || !data.check3;
    return (
      <div className={styles.wrapper}>
        <Contract className={styles.contract} />
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout}>
            <Row>
              <Checkbox id="check1" onChange={this.onClickCheck} checked={data.check1}>
                I hereby agree to the above stated Terms & Conditions
              </Checkbox>
            </Row>
            <Row>
              <Checkbox id="check2" onChange={this.onClickCheck} checked={data.check2}>
                I have read and agree to Section 5 of the Terms & Conditions
              </Checkbox>
            </Row>
            <Row>
              <Checkbox id="check3" onChange={this.onClickCheck} checked={data.check3}>
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

export default connect(({ token }) => ({
  data: token.step,
}))(Step1);
