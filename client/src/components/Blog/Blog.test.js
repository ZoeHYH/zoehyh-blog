import { render, screen } from "@testing-library/react";
import Blog from ".";

test("renders learn react link", () => {
  render(<Blog />);
  const linkElement = screen.getByText(/登入/i);
  expect(linkElement).toBeInTheDocument();
});
