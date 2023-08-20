import {Role, role} from '../models/User';

export const convertMoney = (_text?: string) => {
  // //console.log("11111111 convert money", Math.round(_text / 15 * 100))
  if (_text !== '' && _text !== undefined && _text !== null) {
    let texts = _text?.toString();

    if (_text !== undefined) {
      let text = _text.toString().split('.').join('');
      let length = text.length;
      let value = '';

      if (length >= 4) {
        for (let i = length - 1; i >= 0; i = i - 3) {
          value =
            `${
              text[i - 3] === undefined || text[i - 2] === undefined ? '' : '.'
            }${text[i - 2] === undefined ? '' : text[i - 2]}${
              text[i - 1] === undefined ? '' : text[i - 1]
            }${text[i] === undefined ? '' : text[i]}` + value;
        }
      } else {
        return texts.split('.').join('');
      }
      // //console.log(value);
      return value;
    } else {
      return '';
    }
  } else {
    return '';
  }
};
export const objectIsNull = (object?: any) => {
  if (object === null || object === undefined || object === '(null)') {
    return true;
  } else {
    return false;
  }
};
export const arrayIsEmpty = (array?: any) => {
  if (objectIsNull(array) || array.length === 0) {
    return true;
  } else {
    return false;
  }
};
export const stringIsEmpty = (string?: string) => {
  if (objectIsNull(string) || string === '' || string === 'null') {
    return true;
  } else {
    return false;
  }
};

export const uniqBy = (a?: [], key?: any) => {
  var seen: any = {};
  return a?.filter(function (item) {
    var k = key(item);
    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  });
};
export const findAndReplace = (
  currentArr: Array<any>,
  assignArr: Array<any>,
  key: string,
) => {
  var res = currentArr.map(
    obj => assignArr.find(o => o[key] === obj[key]) || obj,
  );
  return res;
};
export const formatDataSelect = (
  id: number | string,
  label: string,
  data: string | number,
) => {
  return {
    id: id,
    label: label,
    data: data,
  };
};
export const formatDataSelectDefault = (value: string, text: string) => {
  if (value !== text) {
    let values = `${value}`.split(',');
    let texts = `${text}`.split(',');
    let res = [];
    for (let i = 0; i < values.length; i++) {
      res.push(formatDataSelect(values[i], texts[i], texts[i]));
    }
    return res;
  }
  return `${value}`.split(',').map(val => {
    return formatDataSelect(val, val, val);
  });
};
export const isNumeric = (str: string | number) => {
  if (typeof str !== 'number' && typeof str !== 'string') {
    return false;
  }
  return !isNaN(Number(str));
};
export const checkPermission = (roles: Role[], r: role) => {
  let result = roles.findIndex((elem: Role) => elem.code === r);
  return result !== -1;
};
