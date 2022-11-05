/**
 * It takes a single digit string to translate it to the related [MySQL temporal interval expression]{@link https://dev.mysql.com/doc/refman/8.0/en/expressions.html#temporal-intervals}
 * @param {string} format The format to translate
 * @returns {string} The relative temporal interval
 * @throw An error if the format passed doesn't match the mapping
 */
const translateFormat = (format) => {
  const formats = {
    'Y': 'YEAR',
    'M': 'MONTH',
    'd': 'DAY',
    'h': 'HOUR',
    'm': 'MINUTE',
    's': 'SECOND',
  };
  if (!formats[format]) throw new Error('Cannot resolve format');

  return formats[format];
};

/**
 * It takes a timeframe string, such as `1d` (1 Day), or `3h` (3 Hours) and returns the temporal interval expression for MySQL
 * @param {string} timeframe The timeframe string, e.g: 1d, 3h, 2M
 * @returns {string} The timeframe interval
 */
const getIntervalFromTimeframe = (timeframe) => {
  const regex = /([0-9]+)([\w]+)/gm;
  const match = regex.exec(timeframe);
  const [_, timeLength, format] = match;

  return `${timeLength} ${translateFormat(format)}`;
};

module.exports = {
  translateFormat,
  getIntervalFromTimeframe,
};