export const formatErrorMessage = message => {
  if (message.includes('underpriced')) {
    return 'Transaction underpriced. Try increase the gas price.';
  }
  if (message.includes('User denied')) {
    return 'Transaction canceled.';
  }
  return 'eth-js error';
};
