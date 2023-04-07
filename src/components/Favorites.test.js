import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Favorites from '../Favorites';

describe('Favorites', () => {
  const mockFavorites = [
    { id: '1', url: 'https://example.com/cat1.jpg', breeds: [] },
    { id: '2', url: 'https://example.com/cat2.jpg', breeds: [] },
  ];

  beforeEach(() => {
    localStorage.setItem('favorites', JSON.stringify(mockFavorites));
  });

  afterEach(() => {
    localStorage.removeItem('favorites');
  });

  test('renders favorite cat images', () => {
    render(<Favorites />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(mockFavorites.length);
  });

  test('removes favorite cat image', () => {
    render(<Favorites />);
    const removeButtons = screen.getAllByText('Remove');
    userEvent.click(removeButtons[0]);
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(mockFavorites.length - 1);
  });

  test('removes all favorite cat images', () => {
    render(<Favorites />);
    const removeButtons = screen.getAllByText('Remove');
    removeButtons.forEach((button) => userEvent.click(button));
    const images = screen.queryAllByRole('img');
    expect(images.length).toBe(0);
  });
});
