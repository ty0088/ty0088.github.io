import React from 'react';
import { render } from '@testing-library/react';
import Home from '../Components/Home';

describe("Home component", () => {
    it("Snapshot", () => {
      const { container } = render(<Home />);
      expect(container).toMatchSnapshot();
    });
});