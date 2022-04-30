export function randomIntBetween(start, end) {
  return Math.trunc(start + Math.random() * (end - start));
}
