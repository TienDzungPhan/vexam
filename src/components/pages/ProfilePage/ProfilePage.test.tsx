import React from "react";
import { render } from "@testing-library/react";
import ProfilePage from "./ProfilePage";

test("renders ProfilePage", () => {
  render(<ProfilePage />);
  expect(true).toBe(false);
});
