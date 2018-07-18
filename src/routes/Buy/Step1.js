import React from 'react';
import { connect } from 'dva';
import { Form, Button, Checkbox, Row } from 'antd';
import { routerRedux } from 'dva/router';
import { translate } from 'react-i18next';
import styles from './style.less';
import Contract from './Contract';
import { STEP } from './routes';

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
@translate(['buy', 'common'])
export default class Step1 extends React.PureComponent {
  onSubmit = () => {
    this.props.dispatch(routerRedux.replace(STEP[2]));
    this.props.dispatch({ type: 'token/resetBuyTerm' });
  };

  onClickCheck = field => e => {
    this.props.dispatch({
      type: 'token/saveBuyTermData',
      payload: {
        ...this.props.checked,
        [field]: e.target.checked,
      },
    });
  };

  render() {
    const { checked, t } = this.props;
    const buttonDisabled = checked && Object.values(checked).some(v => !v);
    const content = t('accept_terms_list', { returnObjects: true });
    return (
      <div className={styles.wrapper}>
        <Contract className={styles.contract} />
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout}>
            <Row>
              <Checkbox id="check1" onChange={this.onClickCheck(1)} checked={checked[1]}>
                {content[0]}
              </Checkbox>
            </Row>
            <Row>
              <Checkbox id="check2" onChange={this.onClickCheck(2)} checked={checked[2]}>
                {content[1]}
              </Checkbox>
            </Row>
            <Button type="primary" onClick={this.onSubmit} disabled={buttonDisabled}>
              {t('common:next')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
