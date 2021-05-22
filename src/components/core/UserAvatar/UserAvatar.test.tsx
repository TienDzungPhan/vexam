import React from "react";
import { render } from "@testing-library/react";
import UserAvatar from "./UserAvatar";

test("renders UserAvatar", () => {
  render(<UserAvatar size="small" />);
  expect(false).toBe(true);
});
