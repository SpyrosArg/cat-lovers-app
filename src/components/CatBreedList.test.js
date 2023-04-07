import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import CatBreedList from '../CatBreedList';

jest.mock('axios');

describe('CatBreedList', () => {
  const mockBreeds = [
    { id: 'abys', name: 'Abyssinian' },
    { id: 'aege', name: 'Aegean' },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockBreeds });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders cat breeds', async () => {
    render(<CatBreedList />);
    const breedNames = await screen.findAllByText(/Abyssinian|Aegean/i);
    expect(breedNames.length).toBe(mockBreeds.length);
  });

  test('opens breed modal on breed image click', async () => {
    render(<CatBreedList />);
    const breedImage = await screen.findByRole('img', { name: /Abyssinian/i });
    userEvent.click(breedImage);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
