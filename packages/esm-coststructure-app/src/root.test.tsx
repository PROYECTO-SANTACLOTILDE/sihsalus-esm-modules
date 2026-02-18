import React from 'react';
import { render } from '@testing-library/react';
import Root from './root.component';

jest.mock('./routes/router', () => ({
  Router: () => <div data-testid="cost-structure-router">Router</div>,
}));

it('renders the cost structure root component', () => {
  const { getByTestId } = render(<Root />);
  expect(getByTestId('cost-structure-router')).toBeInTheDocument();
});
