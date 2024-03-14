import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RepositoriesListItem from "./RepositoriesListItem";

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "JavaScript",
    description:
      "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    owner: {
      login: "facebook",
    },
    name: "react",
    html_url: "https://github.com/facebook/react",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
}

test("shows a link to the github homepage for this repository", async () => {
  const { repository } = renderComponent();

  await screen.findAllByRole("img", { name: /javascript/i });

  const link = screen.getByRole("link", { name: /github repository/i });

  expect(link).toHaveAttribute("href", repository.html_url);
});

test("shows a file icon for the repository language", async () => {
  renderComponent();

  const icon = await screen.findByRole("img", { name: /javascript/i });

  expect(icon).toHaveClass("js-icon");
});

test("shows the repository name and a link to the code editor page", async () => {
  const { repository } = renderComponent();

  await screen.findByRole("img", { name: /javascript/i });

  const link = await screen.findByRole("link", {
    name: new RegExp(repository.owner.login),
  });

  expect(link).toHaveAttribute("href", `/repositories/${repository.full_name}`);
});
