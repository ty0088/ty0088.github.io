import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import App from '../App';
import { dfTileTypeQty, dfTokenValQty, totalTiles } from '../javascript/gameLogic';

describe('App', () => {
  it('renders headline only', () => {
    render(<App />);
    // check initial render shows heading but no tiles
    expect(screen.getByRole("heading").textContent).toMatch(/Catan Map Generator/i);    
    expect(screen.queryAllByText(/Type/i)).toHaveLength(0);
    expect(screen.queryAllByText(/Token/i)).toHaveLength(0);
  });

  it('renders hex tiles when button clicked', async () => {
    const user = userEvent.setup();

    render(<App />);
    const button = screen.getByRole("button", { name: "New Map" });

    await user.click(button);

    // check after New Map button clicked, tiles have rendered
    expect(screen.getAllByText(/Type/i)).toHaveLength(totalTiles);
    expect(screen.getAllByText(/Token/i)).toHaveLength(totalTiles - 1);
    expect(screen.getAllByText(/Type: 1/i)).toHaveLength(dfTileTypeQty['1']);
    expect(screen.getAllByText(/Type: 2/i)).toHaveLength(dfTileTypeQty['2']);
    expect(screen.getAllByText(/Type: 3/i)).toHaveLength(dfTileTypeQty['3']);
    expect(screen.getAllByText(/Type: 4/i)).toHaveLength(dfTileTypeQty['4']);
    expect(screen.getAllByText(/Type: 5/i)).toHaveLength(dfTileTypeQty['5']);
    expect(screen.getAllByText(/Type: 6/i)).toHaveLength(dfTileTypeQty['6']);
    expect(screen.getAllByText(/Token: 2/i)).toHaveLength(dfTokenValQty['2']);
    expect(screen.getAllByText(/Token: 3/i)).toHaveLength(dfTokenValQty['3']);
    expect(screen.getAllByText(/Token: 4/i)).toHaveLength(dfTokenValQty['4']);
    expect(screen.getAllByText(/Token: 5/i)).toHaveLength(dfTokenValQty['5']);
    expect(screen.getAllByText(/Token: 6/i)).toHaveLength(dfTokenValQty['6']);
    expect(screen.getAllByText(/Token: 8/i)).toHaveLength(dfTokenValQty['8']);
    expect(screen.getAllByText(/Token: 9/i)).toHaveLength(dfTokenValQty['9']);
    expect(screen.getAllByText(/Token: 10/i)).toHaveLength(dfTokenValQty['10']);
    expect(screen.getAllByText(/Token: 11/i)).toHaveLength(dfTokenValQty['11']);
    expect(screen.getAllByText(/Token: 12/i)).toHaveLength(dfTokenValQty['12']);
  });
});