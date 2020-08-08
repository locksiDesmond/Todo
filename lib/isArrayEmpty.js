export default function isArrayEmpty(array) {
  if (array) {
    if (array.length < 1) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}
