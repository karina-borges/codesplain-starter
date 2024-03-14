import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { SWRConfig } from "swr";
import { createServer } from "../../test/server";

import AuthButtons from "./AuthButtons";

async function renderComponent() {
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <MemoryRouter>
        <AuthButtons />
      </MemoryRouter>
    </SWRConfig>
  );
  await screen.findAllByRole("link");
}

describe("When user is not logged in", () => {
  createServer([
    {
      path: "/api/user",
      res: () => {
        return {
          user: null,
        };
      },
    },
  ]);

  test("shows sign in and sign up buttons", async () => {
    await renderComponent();

    const signInButton = screen.getByRole("link", { name: /sign in/i });
    const signUpButton = screen.getByRole("link", { name: /sign up/i });

    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute("href", "/signin");
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveAttribute("href", "/signup");
  });

  test("shows sign out is not visible", async () => {
    await renderComponent();

    const signOutButton = screen.queryByRole("link", { name: /sign out/i });
    expect(signOutButton).not.toBeInTheDocument();
  });
});

describe("When user is logged in", () => {
  createServer([
    {
      path: "/api/user",
      res: () => {
        return {
          user: {
            id: 1,
            email: "test@test.com",
          },
        };
      },
    },
  ]);

  test("shows sign in and sign up buttons is not visible", async () => {
    await renderComponent();

    const signInButton = screen.queryByRole("link", { name: /sign in/i });
    const signUpButton = screen.queryByRole("link", { name: /sign up/i });

    expect(signInButton).not.toBeInTheDocument();
    expect(signUpButton).not.toBeInTheDocument();
  });

  test("shows sign out is visible", async () => {
    await renderComponent();

    const signOutButton = screen.getByRole("link", { name: /sign out/i });
    expect(signOutButton).toBeInTheDocument();
    expect(signOutButton).toHaveAttribute("href", "/signout");
  });
});
