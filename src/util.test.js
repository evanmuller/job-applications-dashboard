import React from "react";
import { sort } from "ramda";
import {
  comparatorAppliedDate,
  parseAppliedDateToTime,
  stripTimeFromDate,
} from "./util";

it("compares applied dates", () => {
  const appliedDates = ["10/17/16", "11/17/15", "01/01/00"];

  expect(sort(comparatorAppliedDate, appliedDates)).toEqual([
    "01/01/00",
    "11/17/15",
    "10/17/16",
  ]);
});

it("parsed applied date strings", () => {
  const date = new Date(parseAppliedDateToTime("10/17/16"));
  expect(date.getMonth()).toBe(9);
  expect(date.getDate()).toBe(17);
  expect(date.getFullYear()).toBe(2016);
});

it("strips time from date", () => {
  const date = new Date(2000, 0, 1, 5, 5, 5, 5);
  expect(date.getHours()).toBe(5);
  expect(date.getMinutes()).toBe(5);
  expect(date.getSeconds()).toBe(5);
  expect(date.getMilliseconds()).toBe(5);

  const stripped = stripTimeFromDate(date);
  expect(stripped.getHours()).toBe(0);
  expect(stripped.getMinutes()).toBe(0);
  expect(stripped.getSeconds()).toBe(0);
  expect(stripped.getMilliseconds()).toBe(0);
});
