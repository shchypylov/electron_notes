# Developex test assignment

## Launch locally:

-   `git clone git@github.com:shchypylov/electron_records.git records`
-   `cd records && yarn && yarn electron-dev`
-   enjoy!

## Build for production:

in the directory with the app: `yarn electron-pack` and then navigate to `/dist/mac`

### Tech used:

1. Electron
2. React
3. Bootstrap 4 (CDN for styling)
4. Redux as unidirectional state management
5. ReduxThunk for async actions
6. Axios as HTTP client

### Take account of:

-   Due to API limitation I was not able to setup proper CRUD for both posts and comments, so I added local ID counters
-   API lacks long-polling requests possibility (or any other way for lazy loading) lazy loading was implemented on front-end
