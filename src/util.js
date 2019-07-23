import { comparator, lt, useWith as rUseWith } from "ramda";

export const parseAppliedDateToTime = appliedDateString => {
  const [
    ,
    monthString,
    dayString,
    yearString,
  ] = /(\d{2})\/(\d{2})\/(\d{2})/.exec(appliedDateString);

  return new Date(
    parseInt(`20${yearString}`, 10),
    parseInt(monthString, 10) - 1,
    parseInt(dayString, 10),
  ).getTime();
};

export const stripTimeFromDate = date => {
  const newDate = new Date(date);
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate;
};

export const comparatorAppliedDate = rUseWith(comparator(lt), [
  parseAppliedDateToTime,
  parseAppliedDateToTime,
]);

export const comparatorGeneralString = (a, b) => a.localeCompare(b);

export const comparatorNumber = comparator(lt);
