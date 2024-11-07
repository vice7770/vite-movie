# React + TypeScript + Vite

Some Explanation for this project:

Decided to go with vite, a simple client side project is the best for this app.

Next js would have been ok, but the point is to expose and interact with api data to the frontend.

Our routing will be managed using react-router.
Our states will be managed by zustand/Reactquery. React-query might be a overkill for this app but i it will manage error and loading states for me plus its standard in the industry.

MileStones:
X Get the data to fetch.(Will only use the page1 of the returned api for my carousels)
X Necessary api calls with types, top movies, top series, romance, comedy.(Will skip for now, romance and comedy)
X UI for Main page, 4 couressel(Missing the 2 other categories)
X Get routing working to redirect to other pages with param.
X Details Screen
X Install state management zustand and React Query, keep state of selected element selected. (Zustand wont be needed).
Working Query states for both Home and Details, with its individual requests and queryKeys.
Optional:
Search with searchParams, maybe debounce for request.
