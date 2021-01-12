export default (blob, filename) => {
  if (navigator.appVersion.toString().indexOf('.NET') > 0) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      document.body.appendChild(link);
    }
    link.click();
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      document.body.removeChild(link);
    }
  }
}
