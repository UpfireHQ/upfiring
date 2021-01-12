const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

export const bytesToSize = (bytes, br = 0, sec = 0) => {
  if (bytes && Number(bytes)) {
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    const res = Number((bytes / Math.pow(1024, i)).toFixed(2));

    return !br ? (<span>{res + ' ' + sizes[i]}{sec ? '/s' : ''}</span>) : (
      <span>{res}<br/>{sec ? sizes[i] + '/s' : ''}</span>);
  }

  return !br ? (<span>0 B{sec ? '/s' : ''}</span>) : (<span>0<br/>B {sec ? '/s' : ''} </span>);
};

export const bytesValue = (bytes) => {

  if (bytes && Number(bytes)) {
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    const res = Number((bytes / Math.pow(1024, i)).toFixed(2));
    return res + ' ' + sizes[i];
  }

  return '0 B';
};
