import React, { Fragment } from 'react';
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
  render() {
    const { dispatch, data } = this.props;
    const onSubmit = () => {
      if (data.check1 && data.check2 && data.check3) {
        dispatch(routerRedux.push('/app/token/2'));
      }
    };
    const onClickCheck = e => {
      data[e.target.id] = e.target.checked;
      dispatch({
        type: 'token/saveStepFormData',
        payload: data,
      });
    };
    return (
      <Fragment>
        <Contract className={styles.contract} />
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout}>
            <Row>
              <Checkbox id="check1" onChange={onClickCheck} checked={data.check1}>
                I hereby agree to the above stated Terms & Conditions
              </Checkbox>
            </Row>
            <Row>
              <Checkbox id="check2" onChange={onClickCheck} checked={data.check2}>
                I have read and agree to Section 5 of the Terms & Conditions
              </Checkbox>
            </Row>
            <Row>
              <Checkbox id="check3" onChange={onClickCheck} checked={data.check3}>
                I am NOT from a country in which ICO or transaction of tokens might be prohibited by
                laws, including but not limit to China and the United States.
              </Checkbox>
            </Row>
            <Button type="primary" onClick={onSubmit}>
              Next
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default connect(({ token }) => ({
  data: token.step,
}))(Step1);
