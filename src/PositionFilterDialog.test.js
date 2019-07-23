import React from "react";
import { allPositions } from "./PositionFilterDialog";

it("to return uniq and sorted array of positions fields and memoize", () => {
  const jobApplications = [
    { position: "Server" },
    { position: "Server", random: "field" },
    { position: "Server" },
    { position: "Cook" },
    { position: "Operator" },
    { position: "Painter" },
  ];

  const expectedPositions = ["Cook", "Operator", "Painter", "Server"];

  expect(allPositions(jobApplications)).toEqual(expectedPositions);
  expect(allPositions([{ position: "Rumrunner" }])).toEqual(expectedPositions);
});
