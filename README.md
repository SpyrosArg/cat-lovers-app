Technical Documentation

Overview

This application is a React-based web app that allows users to explore cat breeds, view random cat images, and save their favorite cat images. The application consumes the RESTful API provided by TheCatAPI (https://thecatapi.com/) to retrieve information about cat breeds, images, and breed-specific details.

Component Hierarchy

The application is composed of the following components:

1. App
2. RandomCatsView
3. CatBreedsView
4. FavoritesView
5. CatBreedList
6. BreedModal
7. CatList
8. CatModal
9. Favorites 

1. App
This is the root component of the application and contains the app's routing configuration.
It utilizes BrowserRouter, NavLink, and Routes from react-router-dom to manage the application's navigation and routing.
2. RandomCatsView
A container component that renders the CatList component with random cat images.
3. CatBreedsView
A container component that renders the CatBreedList component with a list of cat breeds.
4. FavoritesView
A container component that renders the Favorites component to display the user's favorite cat images.
5. CatBreedList
Fetches and displays a list of cat breeds using the REST API.
When a breed is clicked, it opens a BreedModal to display images of that breed.
6. BreedModal
Displays images of a specific cat breed.
Allows users to close the modal.
7. CatList
Fetches and displays a list of cat images, either random or breed-specific, depending on the breedId prop.
When a cat image is clicked, it opens a CatModal to display the image along with breed information.
8. CatModal
Displays a cat image with breed information.
Allows users to add the cat to their favorites or close the modal.
9. Favorites
Retrieves and displays the user's favorite cat images from local storage.
Allows users to remove cat images from their favorites list.

Testing

The application's components are tested using the following test files:

1. BreedModal.test.js
Tests the BreedModal component for rendering breed images, opening the cat modal on breed image click, and closing the breed modal on the close button click.
2. CatBreedList.test.js
Tests the CatBreedList component for rendering cat breeds and opening the breed modal on breed image click.
3. CatList.test.js
Tests the CatList component for rendering cat images and opening the cat modal on image click.
4. CatModal.test.js
Tests the CatModal component for rendering the cat image and breed information, marking the cat image as a favorite, and closing the cat modal on the close button click.
5. Favorites.test.js
Tests the Favorites component for rendering favorite cat images, removing a favorite cat image, and removing all favorite cat images.

Data Flow
The app's data flow is unidirectional, with parent components passing data to their child components via props. Components that fetch data from the API store the data in their local state, and this data is passed down to child components.

API Usage
The app uses the following API endpoints from TheCatAPI:

GET https://api.thecatapi.com/v1/breeds: To fetch a list of cat breeds.
GET https://api.thecatapi.com/v1/images/search?breed_ids={breedId}&limit={limit}: To fetch breed-specific images.
GET https://api.thecatapi.com/v1/images/search?api_key={api_key}&limit={limit}&page={page}&order={order}&breed_id={breed_id}: To fetch random cat images or breed-specific images based on the breed_id parameter.
GET https://api.thecatapi.com/v1/breeds/{breedId}: To fetch breed information.

Error Handling
The app implements basic error handling by catching errors during API calls and logging them to the console.


Application Entry Point
The application is initialized in index.js, where the App component is rendered inside a React.StrictMode container. This container helps to catch potential problems in the application during the development phase.

