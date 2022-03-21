import React from 'react';
import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { ListOf } from '../../../src/components/listOf/ListOf';

describe('ListOf', () => {
  const server = setupServer(
    rest.get(
      `${process.env.REACT_APP_API_URL}allChildren`,
      (req, res, ctx) => {
        return res(ctx.status(200));
      }
    )
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('render title', () => {
    render(<ListOf of="children" />);

    expect(screen.getByRole('heading', { level: 2 }).textContent).toEqual(
      'List of all children'
    );
  });

  it('render diferent title', () => {
    render(<ListOf of="therapeutist" />);

    expect(screen.getByRole('heading', { level: 2 }).textContent).toEqual(
      'List of all therapeutist'
    );
  });
});
