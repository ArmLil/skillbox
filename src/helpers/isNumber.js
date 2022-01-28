export default function isNaturalNumber(str) {
  const pattern = /^(1|([1-9]\d*))$/;
  return pattern.test(str);
}
