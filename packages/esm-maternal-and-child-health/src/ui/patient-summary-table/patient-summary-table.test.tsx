import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PatientSummaryTable from './patient-summary-table.component';

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@openmrs/esm-framework', () => ({
  ...jest.requireActual('@openmrs/esm-framework'),
  useLayoutType: () => 'desktop',
  formatDate: jest.fn((date) => date.toISOString()),
  parseDate: jest.fn((str) => new Date(str)),
  isOmrsDateStrict: jest.fn(),
  useTranslation: () => ({ t: (key: string) => key }),
  launchWorkspace: jest.fn(),
}));

jest.mock('@openmrs/esm-patient-common-lib', () => ({
  useVisitOrOfflineVisit: () => ({ currentVisit: null }),
  launchStartVisitPrompt: jest.fn(),
  CardHeader: ({ title, children }: { title: string; children?: React.ReactNode }) => (
    <div data-testid="card-header">
      <h4>{title}</h4>
      {children}
    </div>
  ),
  EmptyState: ({ displayText }: { displayText: string }) => <div data-testid="empty-state">{displayText}</div>,
  ErrorState: ({ headerTitle }: { headerTitle: string }) => <div data-testid="error-state">{headerTitle}</div>,
  PatientChartPagination: ({ pageNumber, totalItems, currentItems, pageSize, onPageNumberChange }) => (
    <div data-testid="pagination">
      <span>Page {pageNumber}</span>
      <span>Total: {totalItems}</span>
    </div>
  ),
}));

describe('PatientSummaryTable', () => {
  const mockPatientUuid = 'test-uuid';
  const mockHeaderTitle = 'Test Header';
  const mockDisplayText = 'Test Display';

  const mockData = [
    {
      id: '1',
      date: '2025-01-01',
      number: 42,
      text: 'Test text',
      object: { display: 'Test object' },
      array: ['item1', 'item2'],
    },
  ];

  const mockRowConfig = [
    { id: 'date', label: 'Date', dataKey: 'date' },
    { id: 'number', label: 'Number', dataKey: 'number' },
    { id: 'text', label: 'Text', dataKey: 'text' },
    { id: 'object', label: 'Object', dataKey: 'object' },
    { id: 'array', label: 'Array', dataKey: 'array' },
  ];

  const mockDataHook = () => ({
    data: mockData,
    isLoading: false,
    error: null,
  });

  it('renders correctly with date values', () => {
    render(
      <PatientSummaryTable
        patientUuid={mockPatientUuid}
        headerTitle={mockHeaderTitle}
        displayText={mockDisplayText}
        dataHook={mockDataHook}
        rowConfig={mockRowConfig}
      />,
    );

    expect(screen.getByText(mockHeaderTitle)).toBeInTheDocument();
    expect(screen.getByText('2025-01-01T00:00:00.000Z')).toBeInTheDocument();
  });

  it('handles numeric values correctly without treating them as dates', () => {
    render(
      <PatientSummaryTable
        patientUuid={mockPatientUuid}
        headerTitle={mockHeaderTitle}
        displayText={mockDisplayText}
        dataHook={mockDataHook}
        rowConfig={mockRowConfig}
      />,
    );

    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('handles object values with display property', () => {
    render(
      <PatientSummaryTable
        patientUuid={mockPatientUuid}
        headerTitle={mockHeaderTitle}
        displayText={mockDisplayText}
        dataHook={mockDataHook}
        rowConfig={mockRowConfig}
      />,
    );

    expect(screen.getByText('Test object')).toBeInTheDocument();
  });

  it('handles array values by joining them', () => {
    render(
      <PatientSummaryTable
        patientUuid={mockPatientUuid}
        headerTitle={mockHeaderTitle}
        displayText={mockDisplayText}
        dataHook={mockDataHook}
        rowConfig={mockRowConfig}
      />,
    );

    expect(screen.getByText('item1, item2')).toBeInTheDocument();
  });

  // Test empty state
  it('renders empty state when no data is available', () => {
    const emptyDataHook = () => ({
      data: [],
      isLoading: false,
      error: null,
    });

    render(
      <PatientSummaryTable
        patientUuid={mockPatientUuid}
        headerTitle={mockHeaderTitle}
        displayText={mockDisplayText}
        dataHook={emptyDataHook}
        rowConfig={mockRowConfig}
      />,
    );

    expect(screen.getByText(mockDisplayText)).toBeInTheDocument();
  });

  // Test loading state
  it('shows loading state when data is being fetched', () => {
    const loadingDataHook = () => ({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <PatientSummaryTable
        patientUuid={mockPatientUuid}
        headerTitle={mockHeaderTitle}
        displayText={mockDisplayText}
        dataHook={loadingDataHook}
        rowConfig={mockRowConfig}
      />,
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  // Test error state
  it('shows error state when there is an error', () => {
    const errorDataHook = () => ({
      data: null,
      isLoading: false,
      error: new Error('Test error'),
    });

    render(
      <PatientSummaryTable
        patientUuid={mockPatientUuid}
        headerTitle={mockHeaderTitle}
        displayText={mockDisplayText}
        dataHook={errorDataHook}
        rowConfig={mockRowConfig}
      />,
    );

    expect(screen.getByText(mockHeaderTitle)).toBeInTheDocument();
    expect(screen.getByTestId('error-state')).toBeInTheDocument();
  });

  // Test form launch functionality
  it('launches form workspace when button is clicked and visit exists', () => {
    const mockLaunchWorkspace = jest.fn();
    const mockFormWorkspace = 'test-workspace';

    jest.spyOn(require('@openmrs/esm-framework'), 'launchWorkspace').mockImplementation(mockLaunchWorkspace);
    jest
      .spyOn(require('@openmrs/esm-patient-common-lib'), 'useVisitOrOfflineVisit')
      .mockReturnValue({ currentVisit: { uuid: 'visit-uuid' } });

    render(
      <PatientSummaryTable
        patientUuid={mockPatientUuid}
        headerTitle={mockHeaderTitle}
        displayText={mockDisplayText}
        dataHook={mockDataHook}
        rowConfig={mockRowConfig}
        formWorkspace={mockFormWorkspace}
      />,
    );

    const addButton = screen.getByRole('button', { name: 'add' });
    fireEvent.click(addButton);

    expect(mockLaunchWorkspace).toHaveBeenCalledWith(mockFormWorkspace, { patientUuid: mockPatientUuid });
  });

  // Test pagination
  it('displays pagination when data exceeds page size', () => {
    const largeDataSet = Array.from({ length: 15 }, (_, i) => ({
      id: `${i}`,
      date: '2025-01-01',
      number: i,
      text: `Text ${i}`,
      object: { display: `Object ${i}` },
      array: ['item1', 'item2'],
    }));

    const largeDataHook = () => ({
      data: largeDataSet,
      isLoading: false,
      error: null,
    });

    render(
      <PatientSummaryTable
        patientUuid={mockPatientUuid}
        headerTitle={mockHeaderTitle}
        displayText={mockDisplayText}
        dataHook={largeDataHook}
        rowConfig={mockRowConfig}
        pageSize={10}
      />,
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    // Get the total count displayed in pagination
    expect(screen.getByText('Total:', { exact: false })).toBeInTheDocument();
  });

  // Test custom date formatting
  it('formats dates correctly using the formatDate utility', () => {
    const { formatDate } = require('@openmrs/esm-framework');
    formatDate.mockImplementation((date) => '01-Jan-2025');

    render(
      <PatientSummaryTable
        patientUuid={mockPatientUuid}
        headerTitle={mockHeaderTitle}
        displayText={mockDisplayText}
        dataHook={mockDataHook}
        rowConfig={mockRowConfig}
      />,
    );

    expect(screen.getByText('01-Jan-2025')).toBeInTheDocument();
  });

  // Test form launch without active visit
  it('prompts to start visit when launching form without active visit', () => {
    const mockFormWorkspace = 'test-workspace';
    const mockLaunchStartVisitPrompt = jest.fn();

    jest
      .spyOn(require('@openmrs/esm-patient-common-lib'), 'launchStartVisitPrompt')
      .mockImplementation(mockLaunchStartVisitPrompt);

    jest
      .spyOn(require('@openmrs/esm-patient-common-lib'), 'useVisitOrOfflineVisit')
      .mockReturnValue({ currentVisit: null });

    render(
      <PatientSummaryTable
        patientUuid={mockPatientUuid}
        headerTitle={mockHeaderTitle}
        displayText={mockDisplayText}
        dataHook={mockDataHook}
        rowConfig={mockRowConfig}
        formWorkspace={mockFormWorkspace}
      />,
    );

    const addButton = screen.getByRole('button', { name: 'add' });
    fireEvent.click(addButton);

    expect(mockLaunchStartVisitPrompt).toHaveBeenCalled();
  });

  // Test custom form launch callback
  it('calls onFormLaunch callback when provided instead of launching workspace', () => {
    const mockOnFormLaunch = jest.fn();

    jest
      .spyOn(require('@openmrs/esm-patient-common-lib'), 'useVisitOrOfflineVisit')
      .mockReturnValue({ currentVisit: { uuid: 'visit-uuid' } });

    render(
      <PatientSummaryTable
        patientUuid={mockPatientUuid}
        headerTitle={mockHeaderTitle}
        displayText={mockDisplayText}
        dataHook={mockDataHook}
        rowConfig={mockRowConfig}
        onFormLaunch={mockOnFormLaunch}
      />,
    );

    const addButton = screen.getByRole('button', { name: 'add' });
    fireEvent.click(addButton);

    expect(mockOnFormLaunch).toHaveBeenCalledWith(mockPatientUuid);
  });

  // Test error handling in form launch
  it('handles errors during form launch gracefully', () => {
    const mockLaunchWorkspace = jest.fn().mockImplementation(() => {
      throw new Error('Workspace launch failed');
    });
    const mockFormWorkspace = 'test-workspace';
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    jest.spyOn(require('@openmrs/esm-framework'), 'launchWorkspace').mockImplementation(mockLaunchWorkspace);
    jest
      .spyOn(require('@openmrs/esm-patient-common-lib'), 'useVisitOrOfflineVisit')
      .mockReturnValue({ currentVisit: { uuid: 'visit-uuid' } });

    render(
      <PatientSummaryTable
        patientUuid={mockPatientUuid}
        headerTitle={mockHeaderTitle}
        displayText={mockDisplayText}
        dataHook={mockDataHook}
        rowConfig={mockRowConfig}
        formWorkspace={mockFormWorkspace}
      />,
    );

    const addButton = screen.getByRole('button', { name: 'add' });
    fireEvent.click(addButton);

    expect(consoleSpy).toHaveBeenCalledWith('Failed to launch form:', expect.any(Error));
    consoleSpy.mockRestore();
  });

  // Test default value handling
  it('displays default value for undefined or null fields', () => {
    const dataWithNulls = [
      {
        id: '1',
        nullField: null,
        undefinedField: undefined,
      },
    ];

    const configWithDefaults = [
      { id: 'nullField', label: 'Null Field', dataKey: 'nullField', defaultValue: 'Not Available' },
      { id: 'undefinedField', label: 'Undefined Field', dataKey: 'undefinedField', defaultValue: 'Not Set' },
    ];

    const nullDataHook = () => ({
      data: dataWithNulls,
      isLoading: false,
      error: null,
    });

    render(
      <PatientSummaryTable
        patientUuid={mockPatientUuid}
        headerTitle={mockHeaderTitle}
        displayText={mockDisplayText}
        dataHook={nullDataHook}
        rowConfig={configWithDefaults}
      />,
    );

    expect(screen.getByText('Not Available')).toBeInTheDocument();
    expect(screen.getByText('Not Set')).toBeInTheDocument();
  });

  // Test mutate callback after form launch
  it('calls mutate callback after successful form launch', async () => {
    jest.useFakeTimers();
    const mockMutate = jest.fn().mockResolvedValue(undefined);
    const mockFormWorkspace = 'test-workspace';

    // Mock launchWorkspace to resolve immediately
    const mockLaunchWorkspace = jest.fn().mockResolvedValue(undefined);
    jest.spyOn(require('@openmrs/esm-framework'), 'launchWorkspace').mockImplementation(mockLaunchWorkspace);
    jest
      .spyOn(require('@openmrs/esm-patient-common-lib'), 'useVisitOrOfflineVisit')
      .mockReturnValue({ currentVisit: { uuid: 'visit-uuid' } });

    const dataHookWithMutate = () => ({
      ...mockDataHook(),
      mutate: mockMutate,
    });

    render(
      <PatientSummaryTable
        patientUuid={mockPatientUuid}
        headerTitle={mockHeaderTitle}
        displayText={mockDisplayText}
        dataHook={dataHookWithMutate}
        rowConfig={mockRowConfig}
        formWorkspace={mockFormWorkspace}
      />,
    );

    const addButton = screen.getByRole('button', { name: 'add' });
    fireEvent.click(addButton);

    // Advance timers to trigger the setTimeout
    jest.advanceTimersByTime(1000);

    expect(mockLaunchWorkspace).toHaveBeenCalledWith(mockFormWorkspace, { patientUuid: mockPatientUuid });
    expect(mockMutate).toHaveBeenCalled();

    jest.useRealTimers();
  });
});
