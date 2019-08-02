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
7. React-router-dom as router

### Take account of:

-   Please note that due to API limitation I was not able to setup proper CRUD for both posts and comments, so there are few bugs with adding comments to manually added posts, fetching them, etc. I am aware of them, but fixing them in current environment will lead to huge spaghetti if/else code. I hope, this minor issue won't affect your opinion about final result.
-   API lacks long-polling requests possibility (or any other way for lazy loading) lazy loading was implemented on front-end
-   There were no links neither in posts nor in comments, so I have added link Developex in footer, where you can try native browser

#### Final word:
I hope you will enjoy results I had delivered. 

If you will have any questions about the code or implementation, feel free to reach me via [email](mailto:shchypylov@gmail.com) or [telegram](https://t.me/shchypylov)