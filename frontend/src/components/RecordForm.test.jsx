/* eslint-disable no-undef */
import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecordForm from './RecordForm';
import useRecordForm from '../hooks/useRecordForm';

// Mock the custom hook
jest.mock('../hooks/useRecordForm');
jest.mock('react-toastify', () => ({
  ToastContainer: () => <div data-testid="toast-container" />,
}));

describe('RecordForm Component', () => {
  const mockHookData = {
    setRecordDate: jest.fn(),
    saveDefault: jest.fn(),
    saveGoal: jest.fn(),
    countRef: { current: { value: '70' } },
    countDefault: 70,
    addFactorToCount: jest.fn(),
    commentRef: { current: { value: '' } },
    isSending: false,
    sendRecord: jest.fn(),
    recordDate: '2023-05-15',
    changeDate: jest.fn(),
  };

  beforeEach(() => {
    useRecordForm.mockReturnValue(mockHookData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form elements', () => {
    render(<RecordForm onUpdate={() => { }} />);
    expect(screen.getByText(`Default: ${mockHookData.countDefault}`)).toBeInTheDocument();
    expect(screen.getByLabelText('Track')).toBeInTheDocument();
    expect(screen.getByLabelText('Count:')).toBeInTheDocument();
    expect(screen.getByLabelText('Comment')).toBeInTheDocument();
    expect(screen.getByLabelText('Date:')).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    render(<RecordForm onUpdate={() => { }} />);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);
    expect(mockHookData.sendRecord).toHaveBeenCalled();
  });

  it('handles adjustment buttons -1', async () => {
    render(<RecordForm onUpdate={() => { }} />);
    const decreaseButton = screen.getByText('-1');
    await userEvent.click(decreaseButton);
    expect(mockHookData.addFactorToCount).toHaveBeenCalledWith(-1.0);
  });

  it('handles adjustment buttons +1', async () => {
    render(<RecordForm onUpdate={() => { }} />);
    const decreaseButton = screen.getByText('+1');
    await userEvent.click(decreaseButton);
    expect(mockHookData.addFactorToCount).toHaveBeenCalledWith(1.0);
  });

  it('handles adjustment buttons -.2', async () => {
    render(<RecordForm onUpdate={() => { }} />);
    const decreaseButton = screen.getByText('-.2');
    await userEvent.click(decreaseButton);
    expect(mockHookData.addFactorToCount).toHaveBeenCalledWith(-0.2);
  });

  it('handles adjustment buttons +.2', async () => {
    render(<RecordForm onUpdate={() => { }} />);
    const decreaseButton = screen.getByText('+.2');
    await userEvent.click(decreaseButton);
    expect(mockHookData.addFactorToCount).toHaveBeenCalledWith(0.2);
  });

  it('handles default reset', async () => {
    render(<RecordForm onUpdate={() => { }} />);
    const defaultButton = screen.getByText(`Default: ${mockHookData.countDefault}`);
    await userEvent.click(defaultButton);
    expect(mockHookData.setRecordDate).toHaveBeenCalled();
  });

  it('shows loading state during submission', () => {
    useRecordForm.mockReturnValue({ ...mockHookData, isSending: true });
    render(<RecordForm onUpdate={() => { }} />);
    expect(screen.getByText('Sending Record...')).toBeInTheDocument();
  });

  it('handles date change', async () => {
    render(<RecordForm onUpdate={() => { }} />);
    const dateInput = screen.getByLabelText('Date:');
    await userEvent.type(dateInput, '2023-05-20');
    expect(mockHookData.changeDate).toHaveBeenCalled();
  });

  it('handles goal selection', async () => {
    render(<RecordForm onUpdate={() => { }} />);
    const goalButton = screen.getByRole('button', { name: /goal/i });
    await userEvent.click(goalButton);
    expect(mockHookData.saveGoal).toHaveBeenCalled();
  });

  it('handles default save', async () => {
    render(<RecordForm onUpdate={() => { }} />);
    const defaultSaveButton = screen.getByRole('button', { name: /^default$/i });
    await userEvent.click(defaultSaveButton);
    expect(mockHookData.saveDefault).toHaveBeenCalled();
  });
});
