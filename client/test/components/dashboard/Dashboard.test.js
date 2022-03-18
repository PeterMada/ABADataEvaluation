import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import 'whatwg-fetch';
import { Dashboard } from '../../../src/components/dashboard/dashboard';

describe('Dashboard', () => {
  const server = setupServer(
    rest.get(
      `${process.env.REACT_APP_API_URL}dashobard`,

      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ user_first_name: 'Peter', user_last_name: 'Adam' })
        );
      }
    )
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('render dashboard title', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Dashboard for Peter Adam'
      )
    );
  });

  it('renders diferent dashboard title', async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_API_URL}dashobard`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({ user_first_name: 'Adam', user_last_name: 'Peter' })
          );
        }
      )
    );
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Dashboard for Adam Peter'
      )
    );
  });
});
