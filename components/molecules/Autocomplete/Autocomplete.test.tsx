import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Autocomplete from "./index";

jest.mock("../../../hooks/useClickOutside", () => ({
  useClickOutside: jest.fn(),
}));

describe("Autocomplete component", () => {
  const mockOnChange = jest.fn();
  const mockFetchSuggestions = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input with placeholder", () => {
    render(
      <Autocomplete
        value=""
        onChange={mockOnChange}
        placeholder="Search"
        fetchSuggestions={mockFetchSuggestions}
      />
    );

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("calls fetchSuggestions when typing", async () => {
    mockFetchSuggestions.mockResolvedValue([
      { id: 1, name: "Jakarta" },
      { id: 2, name: "Bandung" },
    ]);

    render(
      <Autocomplete
        value=""
        onChange={mockOnChange}
        placeholder="Search"
        fetchSuggestions={mockFetchSuggestions}
      />
    );

    fireEvent.change(screen.getByTestId("input"), {
      target: { value: "a" },
    });

    await waitFor(() => {
      expect(mockFetchSuggestions).toHaveBeenCalledWith("a");
    });
  });

  it("shows suggestions and allows selection", async () => {
    mockFetchSuggestions.mockResolvedValue([{ id: 1, name: "Surabaya" }]);

    render(
      <Autocomplete
        value=""
        onChange={mockOnChange}
        placeholder="Search"
        fetchSuggestions={mockFetchSuggestions}
      />
    );

    fireEvent.change(screen.getByTestId("input"), {
      target: { value: "s" },
    });

    const item = await screen.findByText("Surabaya");
    fireEvent.click(item);

    expect(mockOnChange).toHaveBeenCalledWith("Surabaya");
  });

  it("shows empty state when no results", async () => {
    mockFetchSuggestions.mockResolvedValue([]);

    render(
      <Autocomplete
        value=""
        onChange={mockOnChange}
        placeholder="Search"
        fetchSuggestions={mockFetchSuggestions}
      />
    );

    fireEvent.change(screen.getByTestId("input"), {
      target: { value: "xandora" },
    });

    expect(await screen.findByText("No results found")).toBeInTheDocument();
  });

  it("handles fetchSuggestions error (catch block)", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockFetchSuggestions.mockRejectedValue(new Error("API error"));

    render(
      <Autocomplete
        value=""
        onChange={mockOnChange}
        placeholder="Search"
        fetchSuggestions={mockFetchSuggestions}
      />
    );

    fireEvent.change(screen.getByTestId("input"), {
      target: { value: "error" },
    });

    expect(await screen.findByText("No results found")).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("clears suggestions and closes dropdown when input is empty", async () => {
    mockFetchSuggestions.mockResolvedValue([{ id: 1, name: "Test" }]);

    render(
      <Autocomplete
        value=""
        onChange={mockOnChange}
        placeholder="Search"
        fetchSuggestions={mockFetchSuggestions}
      />
    );

    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { value: "t" } });
    await screen.findByText("Test");

    fireEvent.change(input, { target: { value: "bo" } });

    await waitFor(() => {
      expect(screen.queryByText("Test")).not.toBeInTheDocument();
    });
  });

  it("opens dropdown on focus when value exists", async () => {
    mockFetchSuggestions.mockResolvedValue([]);

    render(
      <Autocomplete
        value="existing"
        onChange={mockOnChange}
        placeholder="Search"
        fetchSuggestions={mockFetchSuggestions}
      />
    );

    fireEvent.focus(screen.getByTestId("input"));

    expect(await screen.findByText("No results found")).toBeInTheDocument();
  });
});
