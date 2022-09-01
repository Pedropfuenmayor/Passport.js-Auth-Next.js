import { renderHook, waitFor } from "@testing-library/react";
import { server } from "../../jest.setup";
import { useGetUsers } from "../../hooks/users";
import Home from "../../pages/index";
import { createWrapper, renderWithClient } from "../util";
import { rest } from "msw";

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
    const element = await result.findByText(/test@test.com/i, { exact: true });
    expect(element).toBeInTheDocument();
  });

  test("fetch users fails", async () => {
    server.use(
      rest.get("*", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const result = renderWithClient(<Home />);

    const element = await result.findByText(/Request failed/i);
    expect(element).toBeInTheDocument();
  });
});
