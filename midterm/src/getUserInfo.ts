export const info = {
  time: new Date().getHours(),
  timezone: new Date().getTimezoneOffset() / 60,
  previousSites: history.length,
  browserLanguage: navigator.language,
  dataCookiesEnabled: navigator.cookieEnabled,
  sizeScreenW: screen.width,
  sizeScreenH: screen.height,
  scrColorDepth: screen.colorDepth,
  scrPixelDepth: screen.pixelDepth,
};
