# DappHero Dashboard
Currently deployed at https://arweave.net/zNeKuBJUlO7kuBksJgoKTVjIKHJ5bYfGv6BcgOihzq8

## Goals
- [x] Deploy to Arweave
- [x] Deploy dapphero-core to [Arweave](https://arweave.net/QXLKZsu2DLUonKxDC5j1DR9dZhtp2C2i-NHWHTezbzQ)
- [ ] Recreate DappHero dashboard
- [x] Implement hash routing
- [ ] Configure new dapphero-core env variables
- [ ] On dapphero-core, replace bubble.io backend with smartweave addresses

## Deployed Assets
- Logo: https://arweave.net/Se6yGCl5B03DxosnMjmhA1eoOwsIO0bsHaGIJmr7N5Y
- Favicon: https://arweave.net/jXLNXjwmZpViJbodmNCczcWN0XkHyR8hxiEvhnAqQ-Y
- Projects Icon: https://arweave.net/y--LjDmE8Ixh07sj0Hmy0rrZqX5EFrAk9BKQyMEt0a8
- Contracts Icon: https://arweave.net/9ayl_-SzNbM-eAZEyre-CuQpKN7d37U4yf32IfjHF60

# SmartWeave Contracts

## Building
Contracts must be compiled from Typescript before deploying by running:

### `yarn build-contracts`
The contracts and state json will be in the `dist` folder
## Current Deployed Addresses
- Projects: `QYKnm-uZY9Ib6r-jwD4HXmkmyjtjWrjBiVTPgx6X1n0`
- Contracts: `FgnK-IPuHLyQhGS_zQUCj22E0Tom-kFEun8zxaoRme4`

## Tests
 You can run tests with the following command:
### `yarn test-contracts`

# Getting Up and Running

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

If you get the error `TypeError: Cannot assign to read only property 'jsx' of object '#<Object>'`, use [this](https://github.com/facebook/create-react-app/issues/9868#issuecomment-723576740) temporary workaround:

1. Go to node_modules/react-scripts/scripts/utils/verifyTypeScriptSetup.js
2. Change line 238 to: `} else if (parsedCompilerOptions[option] !== valueToCheck && option !== "jsx") {`

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
