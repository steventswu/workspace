import i18n from 'src/i18n';

export const formatErrorMessage = message => {
  if (message.includes('underpriced')) {
    return i18n.t('message:transaction_underpriced');
  }
  if (message.includes('User denied')) {
    return i18n.t('message:transaction_reject');
  }
  return 'eth-js error';
};
