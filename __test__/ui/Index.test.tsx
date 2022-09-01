import { renderHook, waitFor } from "@testing-library/react";
import { useGetUsers } from "../../hooks/users";
import Home from "../../pages/index";
import { createWrapper, renderWithClient } from "./util";

describe("test Home Component", () => {
  test("test getUserHook", async () => {
    const { result } = renderHook(() => useGetUsers(), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  test("render users", async () => {
    const result = renderWithClient(<Home />);
    const element = await result.findByText(/test/i);
    expect(element).toBeInTheDocument();
  });
});
