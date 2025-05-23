# MostStarredGithubRepos

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.3.

## Features

- **List Most Starred Repos:** Displays a list of the most starred GitHub repositories created in the last 30 days, sorted in descending order by star count.
- **Repository Details:** Each repository row includes:
  - Repository name (clickable to open a modal)
  - Repository description
  - Number of stars
  - Number of issues
  - Username and avatar of the owner
- **Infinite Scroll Pagination:** The list is implemented as an infinite scroll. New results are loaded as the user scrolls.
- **Virtual Scroll:** Virtual scroll is implemented using Angular Material's `cdk-virtual-scroll-viewport`, so only the rows visible to the user are rendered on the screen, which drastically improves performance and user experience.
- **Repository Rating (Modal):**
  - Clicking the repository name opens a modal window with repository details.
  - Users can rate the repository using a 5-star rating system within the modal.
  - The given rating is displayed next to the repository name in the main list after the modal is closed.
- **Reusable Component:** Both the repository list and the modal use the same reusable component for displaying repository information (DRY principle).
- **Separation of Concerns:** The application logic is split between smart and dumb components.
- **Storing query params:** The application stores query parameters in the URL to enable direct navigation to specific pages. In future releases, these parameters will also be persisted in local storage to enhance session continuity.

## Planned Features for Next Releases

- **NgRx Store (if needed):** Introduce NgRx for state management if the application state becomes more complex or requires advanced traceability and modularity.
- **Error Handler Using Interceptor:** Implement a global HTTP interceptor to handle API errors and provide user-friendly error messages.
- **Proper Loading Status:** Add a feature to display loading indicators during data fetching to improve user experience.
- **Storing query params to local-/sessionStorage:** Add a feature to store query parameters in local storage to avoid loosing pagination context on page refresh.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to http://localhost:4200/. The application will automatically reload whenever you modify any of the source files.

## Test Coverage

You can track the progress of test coverage by comparing the coverage summary before and after adding tests.
To get test coverage report, run:

```bash
npm run coverage
```

## Test Run Summary

### First Run

**Total Tests**: 1 SUCCESS

#### Coverage Summary

- **Statements**: 100% (3/3)
- **Branches**: 100% (0/0)
- **Functions**: 100% (0/0)
- **Lines**: 100% (2/2)

### Last Run

**Total Tests**: 34 SUCCESS

#### Coverage Summary

- **Statements**: 98.59% (139/141)
- **Branches**: 95% (19/20)
- **Functions**: 97.5% (39/40)
- **Lines**: 98.5% (131/133)

## Why I Didn’t Use NgRx this time

This project’s state is relatively simple. I used Angular services and Signal-based stores to avoid overengineering. If the app were to scale (e.g., with auth, theming, offline mode), I’d introduce NgRx for better state traceability and modularity.
