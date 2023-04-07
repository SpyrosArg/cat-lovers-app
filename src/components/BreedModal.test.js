import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import BreedModal from '../BreedModal';

jest.mock('axios');

describe('BreedModal', () => {
  const mockBreedId = 'abys';
  const mockBreedName = 'Abyssinian';
  const mockBreedImages = [
    { id: '1', url: 'https://example.com/breed1.jpg', breeds: [] },
    { id: '2', url: 'https://example.com/breed2.jpg', breeds: [] },
  ];

  beforeEach(() => {
    axios.get
      .mockResolvedValueOnce({ data: { description: 'Sample description' } })
      .mockResolvedValue({ data: mockBreedImages });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders breed images', async () => {
    render(
      <BreedModal breedId={mockBreedId} breedName={mockBreedName} onClose={() => {}} />
    );
    const breedImages = await waitFor(() =>
      screen.findAllByRole('img', { name: /Breed Image/i })
    );
    expect(breedImages.length).toBe(mockBreedImages.length);
  });

  test('opens cat modal on breed image click', async () => {
    render(
      <BreedModal breedId={mockBreedId} breedName={mockBreedName} onClose={() => {}} />
    );
    const breedImage = await screen.findByRole('img', { name: /Breed Image 1/i });
    userEvent.click(breedImage);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('closes breed modal on close button click', async () => {
    const handleClose = jest.fn();
    render(
      <BreedModal breedId={mockBreedId} breedName={mockBreedName} onClose={handleClose} />
    );
    const closeButton = screen.getByRole('button', { name: /close/i });
    userEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });
});
