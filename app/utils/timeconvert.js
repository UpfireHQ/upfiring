import trans from '../translations';

export const convertMS = (milliseconds) => {
  let day, hour, minute, seconds;

  if (!milliseconds || milliseconds === Infinity) {
    return '';
  }

  seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(seconds / 60);
  hour = Math.floor(minute / 60);
  day = Math.floor(hour / 24);

  seconds = Number(seconds % 60);
  minute = Number(minute % 60);
  hour = Number(hour % 24);

  return [
    day && day + trans('Days'),
    hour && hour + trans('Hours'),
    minute && minute + trans('Minutes'),
    seconds && seconds + trans('Seconds')
  ].filter(x => Boolean(x)).join(' ');
};
