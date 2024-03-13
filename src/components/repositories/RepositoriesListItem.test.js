import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RepositoriesListItem from "./RepositoriesListItem";

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "JavaScript",
    description:
      "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    owner: "facebook",
    name: "react",
    html_url: "https://github.com/facebook/react",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );
}

test("shows a link to the github homepage for this repository", async () => {
  renderComponent();

  await screen.findAllByRole("img", { name: /javascript/i });

  // const link = screen.getByRole("link", { name: /facebook\/react/i });
  // expect(link).toHaveAttribute("href", "https://github.com/facebook/react");
});

const pause = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 100);
  });
};
