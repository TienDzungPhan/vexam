import React from "react";
import { render } from "@testing-library/react";
import HomePage from "./HomePage";

test("renders HomePage", () => {
  render(<HomePage />);
  expect(true).toBe(false);
});
