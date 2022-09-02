import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Shop from '../Components/Shop';

describe("Shop component", () => {
    it("Shop renders no items", () => {
        const shopItems = ({});
        render(<Shop shopItems={shopItems} />, {wrapper: MemoryRouter});
        expect(screen.getByText(/sorry/i)).toBeVisible()
    });

    it("Shop has items", () => {
        const shopItems = ({"1": {}});
        render(<Shop shopItems={shopItems} />, {wrapper: MemoryRouter});
        expect((screen.getAllByRole('img')).length).toBeGreaterThan(0);
    });
});