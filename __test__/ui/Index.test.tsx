import { render, screen } from "@testing-library/react";
import Home from "../../pages/index";

test("render Heading", () => {
  render(<Home />);
  const headerElement = screen.getByRole("heading", {
    name: "Welcome to Next.js!",
    
  });
  expect(headerElement).toBeInTheDocument();
});
