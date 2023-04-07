import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import CatList from '../CatList';

jest.mock('axios');

describe('CatList', () => {
  const mockImages = [
    { id: '1', url: 'https://example.com/cat1.jpg', breeds: [] },
    { id: '2', url: 'https://example.com/cat2.jpg', breeds: [] },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockImages });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders cat images', async () => {
    render(<CatList />);
    const images = await screen.findAllByRole('img');
    expect(images.length).toBe(mockImages.length);
  });

  test('opens cat modal on image click', async () => {
    render(<CatList />);
    const image = await screen.findByRole('img', { name: /Cat 1/i });
    userEvent.click(image);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
