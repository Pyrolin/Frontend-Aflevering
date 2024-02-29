import { render, screen, queryByAttribute  } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, } from "vitest";
import '@testing-library/jest-dom'
import App from "./App";

describe(App.name, () => {
    it("should render", async () => {
      const user = userEvent.setup();

      const getById = queryByAttribute.bind(null, 'id');

      const dom = render(<App />);
      const country = getById(dom.container, 'country');
      const number = getById(dom.container, 'nummer');

      if (country && number) {
        await user.selectOptions(country, "Danmark")
        await user.type(number, "1234")
      }
      expect(number?.classList.contains("number_error")).toBe(true)
    });
  });