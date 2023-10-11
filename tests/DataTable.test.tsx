import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import DataTable from "../src/components/DataTable/DataTable";

test("renders DataTable component with loading message", () => {
  render(<DataTable fileSent={true} data={[]} />);
  const loadingElement = screen.getByText("Loading...");
  expect(loadingElement).toBeInTheDocument();
});

test("renders DataTable component with search input", () => {
  render(<DataTable fileSent={true} data={[]} />);
  const searchInput = screen.getAllByPlaceholderText(
    "Search for an item by any term..."
  );
  expect(searchInput).toBeInTheDocument();
});

test("renders DataTable component with keys and values", () => {
  const data = [
    { name: "John", city: "NY", country: "USA", favorite_sport: "Soccer" },
    { name: "Alcie", city: "Miami", country: "USA", favorite_sport: "MTB" },
  ];

  render(<DataTable fileSent={true} data={data} />);

  const expectedKeys = ["name", "city", "country", "favorite_sport"];
  const expectedValues = [
    "John",
    "NY",
    "USA",
    "Soccer",
    "Alcie",
    "Miami",
    "MTB",
  ];

  expectedKeys.forEach((key) => {
    const keyElement = screen.getByText(key);
    expect(keyElement).toBeInTheDocument();
  });

  expectedValues.forEach((value) => {
    const valueElement = screen.getByText(value);
    expect(valueElement).toBeInTheDocument();
  });
});

test("handles search and displays results", async () => {
  const data = [
    { name: "John", city: "NY", country: "USA", favorite_sport: "Soccer" },
    { name: "Alcie", city: "Miami", country: "USA", favorite_sport: "MTB" },
  ];

  render(<DataTable fileSent={true} data={data} />);
  const searchInput = screen.getAllByPlaceholderText(
    "Search for an item by any term..."
  )[0];
  fireEvent.change(searchInput, { target: { value: "John" } });

  await screen.findByText("John");
  const johnElement = screen.getByText("John");
  expect(johnElement).toBeInTheDocument();
});
