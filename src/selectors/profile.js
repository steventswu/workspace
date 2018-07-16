import { PENDING, VERIFIED } from 'src/utils/status';
import i18n from 'src/i18n';

export const getWalletList = walletAddressMap =>
  Object.values(walletAddressMap).filter(
    w => w.isVerified === PENDING || w.isVerified === VERIFIED
  );

export const getVerifiedWalletList = walletAddressMap =>
  Object.values(walletAddressMap)
    .filter(w => w.isVerified === VERIFIED)
    .map(w => w.walletAddress);

export const getIconType = status => {
  if (status === PENDING) return 'clock-circle-o';
  if (status === VERIFIED) return 'check-circle-o';
};

export const getButtonStatus = status => {
  if (status === PENDING) return i18n.t('common:pending');
  if (status === VERIFIED) return i18n.t('common:verified');
};

export const isWhitelist = walletAddressMap =>
  walletAddressMap
    ? Object.values(walletAddressMap).filter(w => w.isVerified === VERIFIED).length > 0
    : false;
