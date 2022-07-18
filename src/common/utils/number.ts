const pad = (num: string | number | undefined, size = 2) => {
  let _num = (num ?? 0).toString();

  while (_num.length < size) _num = '0' + _num;

  return _num;
};

const trimZeroes = (number: string | number) => {
  if (typeof number === 'number') return +number;

  return number.replace(/^0+/g, '').replace(/(?<=^-)0+/g, '');
};

export const NumberUtils = {
  pad,
  trimZeroes,
};
