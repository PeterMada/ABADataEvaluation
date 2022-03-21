import React from 'react';
import '@testing-library/jest-dom';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import 'whatwg-fetch';
require('dotenv').config();
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
    ),
    rest.get(
      `${process.env.REACT_APP_API_URL}personsList`,
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            user_first_name: 'Adam',
            user_last_name: 'Peter',
          })
        );
      }
    ),
    rest.get(
      `${process.env.REACT_APP_API_URL}childrenList`,
      (req, res, ctx) => {
        return res(ctx.status(200));
      }
    )
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('render dashboard title', async () => {
    render(
      <BrowserRouter>
        <Dashboard setAuth={() => null} />
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
        <Dashboard setAuth={() => null} />
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Dashboard for Adam Peter'
      )
    );
  });

  it.skip('render person list container', () => {
    render(
      <BrowserRouter>
        <Dashboard setAuth={() => null} />
      </BrowserRouter>
    );

    expect(screen.getByTestId('personsListWrapper')).toBeInTheDocument();
  });

  // TODO fix this
  it.skip('render heading', () => {
    render(
      <BrowserRouter>
        <Dashboard setAuth={() => null} />
      </BrowserRouter>
    );

    expect(
      screen.getAllByRole('heading', { level: 2 })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveTextContent(
      'Lists of people'
    );
  });

  it('renders message when lists of people is empty', async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_API_URL}personsList`,
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json([]));
        }
      )
    );

    render(
      <BrowserRouter>
        <Dashboard setAuth={() => null} />
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(
        screen.queryByText('There are no people in list')
      ).toBeInTheDocument()
    );
  });

  it('do not show empty list message when there are some people', async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_API_URL}personsList`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json([
              {
                user_first_name: 'Adam',
                user_last_name: 'Peter',
              },
            ])
          );
        }
      )
    );

    render(
      <BrowserRouter>
        <Dashboard setAuth={() => null} />
      </BrowserRouter>
    );
    await waitForElementToBeRemoved(() =>
      screen.queryByText('There are no people in list')
    );

    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'Adam Peter'
      )
    );
  });

  it.skip('shows people name in list', async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_API_URL}personsList`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              user_first_name: 'Adam',
              user_last_name: 'Peter',
            })
          );
        }
      )
    );

    render(
      <BrowserRouter>
        <Dashboard setAuth={() => null} />
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'Adam Peter'
      )
    );
  });
});
