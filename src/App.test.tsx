import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import HomeScreen from "./Screens/HomeScreen";

describe("App Component", () => {
  function spyOnConsoleError() {
    return jest
      .spyOn(console, "error")
      .mockImplementation(() => {}) as jest.SpyInstance;
  }

  test("ErrorBoundary catches errors", () => {
    const ErrorComponent = () => {
      throw new Error("Test error");
    };
    const consoleErrorSpy = spyOnConsoleError();

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Something went wrong. Please try again later./i)
    ).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});
