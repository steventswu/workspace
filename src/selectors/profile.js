import { PENDING, VERIFIED } from 'src/utils/status';

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
  if (status === PENDING) return 'Pending';
  if (status === VERIFIED) return 'Verified';
};
