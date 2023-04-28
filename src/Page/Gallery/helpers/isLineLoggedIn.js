import liff from '@line/liff';

export async function isLineLoggedIn() {
  await liff.init({ liffId: '<your liff app ID>' });
  return liff.isLoggedIn();
}