/**
 * Created by maximnord on 3/22/18.
 */
export const lnProgres = (value, max = 12500000) => {
  value = +value || 0;
  max = +max || 1;
  let x = Math.floor((value * 100) / max);
  return Math.floor((1 - Math.pow(0.94, x)) * 100);
};
