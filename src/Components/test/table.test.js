import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TeamShow from '../../Views/TeamShow';
import '@testing-library/jest-dom';
/*global test,expect,afterEach*/

afterEach(() => {
  cleanup();
});

test('on initial render debug screen', async () => {
  render(
    <Router>
      <TeamShow />
    </Router>
  );
  screen.debug();
});

test('on initial render test all buttons are enabled', async () => {
  render(
    <Router>
      <TeamShow />
    </Router>
  );
  const buttons = await screen.findAllByRole('button');
  expect(buttons.length).toBeGreaterThanOrEqual(1);
  buttons.forEach((btn) => {
    expect(btn).toBeEnabled();
    console.log(btn.textContent);
  });
  console.log(buttons.length);
});

test('on initial render one table', async () => {
  render(
    <Router>
      <TeamShow />
    </Router>
  );
  const table = await screen.findAllByRole('table');
  expect(table.length).toBe(1);
});
