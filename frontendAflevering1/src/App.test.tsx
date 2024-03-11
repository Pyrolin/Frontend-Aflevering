import { render, screen, } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, } from "vitest";
import '@testing-library/jest-dom'
import App from "./App";

describe('App', () => {
    it("displays error message for invalid email", async () => {
        render(<App />);
        
        const emailInput = screen.getByLabelText("Email:");
    
    await userEvent.type(emailInput, "invalid-email");
    
    expect(emailInput).toHaveClass("email_error");
      });
    it("should render", async () => {
      render(<App />);
      
      const country = screen.getByLabelText("Country:");
      const number = screen.getByLabelText("Telefon nummer:");

      await userEvent.selectOptions(country, "Danmark");
      await userEvent.type(number, "1234");
      
      expect(number).toHaveClass("number_error");
    });
  });

