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
        const shopItems = ({
            "1": {
            "name": "Mittens",
            "type": "American Wirehair",
            "sex": "Male",
            "currency": "£",
            "price": 600,
            "age": "2 Months",
            "likes": "Purring, eating, playing",
            "qty available" : 1,
            "available": true
        }});
        render(<Shop shopItems={shopItems} clickAddBtn={addToCart}/>, {wrapper: MemoryRouter});
        userEvent.click(screen.getByRole("button", {name: "Add to Cart"}));
        expect(addToCart).toHaveBeenCalledTimes(1);
        expect((screen.getAllByRole('img')).length).toBeGreaterThan(0);
        expect(screen.getByRole("button", {name: "Add to Cart"})).toBeVisible();
    });

    it("Cat is unavailable", () => {
        const shopItems = ({
            "1": {
            "name": "Mittens",
            "type": "American Wirehair",
            "sex": "Male",
            "currency": "£",
            "price": 600,
            "age": "2 Months",
            "likes": "Purring, eating, playing",
            "qty available" : 1,
            "available": false
        }});
        render(<Shop shopItems={shopItems} clickAddBtn={addToCart}/>, {wrapper: MemoryRouter});
        expect(screen.getByText(/currently unavailable/i)).toBeVisible();
        expect(screen.queryByRole("button", {name: "Add to Cart"})).not.toBeInTheDocument();
    });
});