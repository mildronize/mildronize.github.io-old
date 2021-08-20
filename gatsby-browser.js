/* eslint import/prefer-default-export: "off" */
export const onServiceWorkerUpdateReady = () => {
  // Auto reload to display the latest version, when service worker update ready.
  window.location.reload();
};
