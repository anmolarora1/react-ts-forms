import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox from './Checkbox';

const props = { label: 'Mock Checkbox' };

describe('Checkbox', () => {
  afterEach(cleanup);

  it('renders in the document', () => {
    const { getByRole } = render(<Checkbox {...props} />);
    const element = getByRole('checkbox');
    expect(element).toBeInTheDocument();
  });

  it('displays label', () => {
    const handleChange = jest.fn();
    const { getByText } = render(<Checkbox {...props} onChange={handleChange} />);
    const element = getByText(props.label);
    expect(element).toBeInTheDocument();
  });

  it('handles onChange', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<Checkbox {...props} onChange={handleChange} />);
    const element = getByRole('checkbox');

    expect(handleChange).not.toHaveBeenCalled();

    userEvent.click(element);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('handles toggling checked state', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<Checkbox {...props} onChange={handleChange} />);
    const element = getByRole('checkbox');

    expect(handleChange).not.toHaveBeenCalled();

    userEvent.click(element);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);

    handleChange.mockClear();

    userEvent.click(element);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('allows to pass the value as a prop', () => {
    const { getByRole } = render(<Checkbox {...props} value />);
    const element = getByRole('checkbox') as HTMLInputElement;
    expect(element.checked).toEqual(true);
  });

  it('handles default checked state', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<Checkbox {...props} defaultValue onChange={handleChange} />);
    const element = getByRole('checkbox');

    expect(handleChange).not.toHaveBeenCalled();

    userEvent.click(element);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('does not call onChange in disabled mode', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<Checkbox {...props} onChange={handleChange} disabled />);
    const element = getByRole('checkbox');

    userEvent.click(element);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
