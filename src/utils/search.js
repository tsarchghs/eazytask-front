// https://github.com/joehdodd/react-filter-search/blob/master/src/filter.js
// there is a bug for the react component but the filter part is solid :)

function strOp(str) {
  return str
    .toString()
    .replace(/\s/g, '')
    .toLowerCase();
}

function objectValues(value) {
  return Object.values(value).reduce((string, val) => {
    const test = val !== null && val !== undefined;
    return (
      string +
      (typeof val === 'object' && val !== null
        ? strOp(objectValues(val))
        : test ? strOp(val) : '')
    );
  }, '');
}

export function filter(val, data) {
  return data.filter(el => {
    return !!val.length ? objectValues(el).includes(strOp(val)) : true;
  });
}