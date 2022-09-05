import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Shop from '../Components/Shop';

const addToCart = jest.fn();

describe("Shop component", () => {
    it("Shop renders no items", () => {
        const shopItems = ({});
        render(<Shop shopItems={shopItems} />, {wrapper: MemoryRouter});
        expect(screen.getByText(/sorry/i)).toBeVisible();
    });

    it("Shop has item and add to cart", () => {
        const shopItems = ({"1": {}});
        render(<Shop shopItems={shopItems} clickAddBtn={addToCart}/>, {wrapper: MemoryRouter});
        userEvent.click(screen.getByRole("button", {name: "Add to Cart"}));
        expect(addToCart).toHaveBeenCalledTimes(1);
        expect((screen.getAllByRole('img')).length).toBeGreaterThan(0);
        expect(screen.getByRole("button", {name: "Add to Cart"})).toBeVisible();
    });
});