import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App tests', () => {
  test('shows welcome', () => {
    render(<App />);
    const welcomeElement = screen.getByText(/welcome/i);
    expect(welcomeElement).toBeInTheDocument();
  });

  it('gets the list of employees', async () => {
    render(<App />)

    await screen.findByRole('heading', { name: /ada lovelace/i })

    const img = screen.getByRole('img', {
      name: /Ada Lovelace/i,
    }) as HTMLImageElement

    expect(img.src).toBe(
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/779.jpg'
    )
  })
})

