import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CatModal from '../CatModal';

describe('CatModal', () => {
  const mockCatImage = {
    id: '1',
    url: 'https://example.com/cat1.jpg',
    breeds: [{ id: 'abys', name: 'Abyssinian', description: 'Sample description' }],
  };

  test('renders cat image and breed information', () => {
    render(<CatModal catImage={mockCatImage} onClose={() => {}} />);
    const catImage = screen.getByRole('img', { name: /Cat 1/i });
    const breedName = screen.getByText(/Abyssinian/i);
    const breedDescription = screen.getByText(/Sample description/i);

    expect(catImage).toBeInTheDocument();
    expect(breedName).toBeInTheDocument();
    expect(breedDescription).toBeInTheDocument();
  });

  test('marks cat image as favorite', () => {
    render(<CatModal catImage={mockCatImage} onClose={() => {}} />);
    const favoriteCheckbox = screen.getByRole('checkbox', { name: /Favorite/i });
    userEvent.click(favoriteCheckbox);

    const favorites = JSON.parse(localStorage.getItem('favorites'));
    expect(favorites).toHaveLength(1);
    expect(favorites[0].id).toBe(mockCatImage.id);
  });

  test('closes cat modal on close button click', () => {
    const handleClose = jest.fn();
    render(<CatModal catImage={mockCatImage} onClose={handleClose} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    userEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });
});
