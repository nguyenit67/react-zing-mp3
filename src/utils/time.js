export function getFormattedDateTime(date = new Date()) {
  return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${padLeadingZero(
    date.getMinutes()
  )}:${padLeadingZero(date.getSeconds())}`;
}

export const formatTime = (number) => {
  let h = Math.floor(number / 60);
  let m = number % 60;

  return `${padLeadingZero(h)}:${padLeadingZero(m)}`;
};

export function padLeadingZero(value) {
  return value > 9 ? value : `0${value}`;
}

console.log(getFormattedDateTime());
