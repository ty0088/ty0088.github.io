import React from 'react';
import { render , screen } from '@testing-library/react';
import Contact from '../Components/Contact';

describe("Contact component", () => {
    it("Snapshot", () => {
      const { container } = render(<Contact />);
      expect(container).toMatchSnapshot();
    });

    it("Email link present", () => {
        render(<Contact />);
        expect(screen.getByRole("link", {name: "cats-r-us@catsRusStore.cats"})).toBeTruthy();
    });

    it("Phone link present", () => {
        render(<Contact />);
        expect(screen.getByRole("link", {name: "0123 1234 1234"})).toBeTruthy();
    });
});