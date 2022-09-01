import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Layout from '../Components/Layout';


const currPage = 'Home';
const currPageClick = jest.fn();

jest.mock('../Components/Nav', () => ({currPageClick}) => (
    <>
        <button onClick={currPageClick}>Link</button>
    </>
));

describe("Layout component", () => {
    it("Heading renders Home", () => {
        render(<Layout currPage={currPage} currPageClick={currPageClick}/>);
        expect(screen.getAllByRole("heading")[1].textContent).toMatch(/home/i);
    });

    it("Nav link click", () => {
        render(<Layout currPage={currPage} currPageClick={currPageClick}/>);
        userEvent.click(screen.getByRole("button"));
        expect(currPageClick).toHaveBeenCalledTqimes(1);
    });
});