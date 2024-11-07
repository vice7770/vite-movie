# React + TypeScript + Vite

Some Explanation for this project:

This project has a Home page with sections of movies, they animate and on click navigates to details page. Contain load and error states. Also includes a search for movies and series

Decided to go with vite, a simple client side project is the best for this app.

Next js would have been ok, but the point is to expose and interact with api data to the frontend.

Our routing will be managed using react-router.
Our states will be managed by zustand/Reactquery. React-query might be a overkill for this app but it will manage error and loading states for me plus its standard in the industry.

Set up:

Normal setup, install npm packages and run on dev.
You need to set you env file, in /.env with your own db keys:

VITE_API_KEY=YOUR_KEY
VITE_API_TOKEN=YOUR_API

MileStones:

X Get the data to fetch.(Will only use the page1 of the returned api for my carousels)

X Necessary api calls with types, top movies, top series, romance, comedy.(Will skip for now, romance and comedy)

X UI for Main page, 4 couressel(Missing the 2 other categories)

X Get routing working to redirect to other pages with param.

X Details Screen

X Install state management zustand and React Query, keep state of selected element selected. (Zustand wont be needed).

X Working Query states for both Home and De tails, with its individual requests and queryKeys.

X Adding missing geners to the Home page

Optional:
X Search, maybe debounce for request.( should have search by tv or movies, debounce for not making the request on every input change)
