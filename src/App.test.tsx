import React from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import App from './App'
import { server } from './mocks/server'
import { getEmloyeesException } from './mocks/handlers'

describe('App tests', () => {
  test('shows welcome', () => {
    render(<App />)
    const welcomeElement = screen.getByText(/welcome/i)
    expect(welcomeElement).toBeInTheDocument()
  })

  test('gets the list of employees', async () => {
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

describe('Bad network', () => {
  test('shows error', async() => {
    server.use(getEmloyeesException);
    render(<App />);

    const errorDisplay = await screen.findByText(`Sorry there's been an error`);
    expect(errorDisplay).toBeInTheDocument();

    const displayedEmployees = screen.queryAllByRole('h3');
    expect(displayedEmployees).toEqual([]);
  })
})