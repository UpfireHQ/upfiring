export const currencyToSize = (value) => {
  const sizes = ['', 'K', 'M'];
  let result = '';
  if (Number(value) === 0) {
    result = '0';
  } else {
    const i = parseInt(Math.floor(Math.log(value) / Math.log(1000)));
    const res = Number((value / Math.pow(1000, i)).toFixed(2));
    result = res + ' ' + sizes[i];
  }
  return result;
};

export const ufrFormat = (value) => {
  return String(Number(value).toFixed(4)).replace(/\.?0+$/, '');
};
