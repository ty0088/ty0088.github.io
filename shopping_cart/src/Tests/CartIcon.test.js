import React from 'react';
import { render , screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import CartIcon from '../Components/CartICon';

describe("CartIcon component", () => {
    it("Qty is 0", () => {
        const cartQty = 0;
        render(<CartIcon cartQty={cartQty}/>, {wrapper: MemoryRouter});
        expect(screen.queryByTestId('qty-check')).not.toBeInTheDocument()
    });

    it("Qty is 1", () => {
        const cartQty = 1;
        render(<CartIcon cartQty={cartQty}/>, {wrapper: MemoryRouter});
        expect(screen.getByText("1")).toBeVisible();
    });
})