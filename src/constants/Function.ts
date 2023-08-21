import {Dimensions } from 'react-native'

export const WIDTH_SCREEN = Dimensions.get('screen').width
export const HEIGHT_WINDOW = Dimensions.get('screen').height

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
            `${text[i - 3] === undefined || text[i - 2] === undefined ? '' : '.'
            }${text[i - 2] === undefined ? '' : text[i - 2]}${text[i - 1] === undefined ? '' : text[i - 1]
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

export const convertDateTime = (_time: any, _type: string, isUTC: boolean) => {
  if (_time === null || _time === undefined) {
    return '';
  }
  _time = new Date(_time);
  let dayStr = '';
  let monthStr = '';
  let yearStr = '';
  let hourStr = '';
  let minStr = '';
  let secondStr = '';
  let day = _time.getDate();
  if (isUTC) {
    day = _time.getUTCDate();
  }
  dayStr = day.toString();
  if (day < 10) {
    dayStr = '0' + day;
  }
  let month = _time.getMonth() + 1;
  if (isUTC) {
    month = _time.getUTCMonth() + 1;
  }
  monthStr = month.toString();
  if (month < 10) {
    monthStr = '0' + month;
  }
  let year = _time.getFullYear();
  yearStr = year.toString();
  let hours = _time.getHours();
  if (isUTC) {
    hours = _time.getUTCHours();
  }
  hourStr = hours.toString();
  if (hours < 10) {
    hourStr = '0' + hours;
  }
  let minutes = _time.getMinutes();
  if (isUTC) {
    minutes = _time.getUTCMinutes();
  }
  minStr = minutes.toString();
  if (minutes < 10) {
    minStr = '0' + minutes;
  }
  let seconds = _time.getSeconds();
  if (isUTC) {
    seconds = _time.getUTCSeconds();
  }
  secondStr = seconds.toString();
  if (seconds < 10) {
    secondStr = '0' + seconds;
  }
  let result = '';
  switch (_type) {
    case 'dd-MM-yyyy':
      result = `${dayStr}-${monthStr}-${yearStr}`;
      break;
    case 'dd-MM':
      console.log(monthStr);
      result = `${dayStr}-${monthStr}`;
      break;
    case 'dd-MM-yyyy hh:mm:ss':
      result =
        `${dayStr}-${monthStr}-${yearStr} ` +
        `${hourStr}:${minStr}:${secondStr}`;
      break;
    case 'dd-mm-yyyy hh:mm':
      result = `${dayStr}-${monthStr}-${yearStr} ` + `${hourStr}:${minStr}`;
      break;
    case 'hh:mm:ss':
      result = `${hourStr}:${minStr}:${secondStr}`;
      break;
    case 'hh:mm':
      result = `${hourStr}:${minStr}`;
      break;
    case 'hh:mm dd-mm-yyyy':
      result = `${hourStr}:${minStr} ${dayStr}-${monthStr}-${yearStr}`;
      break;
    case 'hh:mm dd/mm/yyyy':
      result = `${hourStr}:${minStr} ${dayStr}/${monthStr}/${yearStr}`;
      break;
    default:
      result =
        `${dayStr}-${monthStr}-${yearStr} ` +
        `${hourStr}:${minStr}:${secondStr}`;
      break;
  }
  return result;
};
