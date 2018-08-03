# CAP

CAP fund market

## Getting started

```sh
$ yarn dev
```

## Developing

### Built with

* React.js
* ant-design
* umi.js
* dva.js
* i18next
* ...

### Folder structure

* `config/`: nginx related configs for docker image
* `dist/`: staging/production build files output path
* `mock/`: can mock api when developing
* `public/`: files to be public accessed
* `src/`: source code is here
* `tests/`: ignore this

#### `src/`

* `assets/`: photos, images, icons
* `components/`: general-purpose custom components, also include components from `ant-design-pro` 
* `e2e/`: ignore this
* `layouts/`: layout files for `pages/`, `src/layouts/index.js` will be used for global layout
* `locales/`: store locale file in `.json` format
* `models/`: global states in the Redux store; support by `umi-plugin-dva` (see `.umirc.js`)
* `pages/`: folder or file name will be used for routing
* `routes/`: route names constants and private routing component
* `selectos/`: format data form store or network requests
* `services/`: making network requests
* `utils/`: helper and utility files
* `i18n.js`: `i18next` configs

#### Project config files

* `.env.<development|production|staging>`: environment variables
* `.prettierrc`: Prettier config files for editor extension to read
* `.umirc.js`: Umi.js config files, see: https://umijs.org/guide/config.html
* `deploy.sh`: build docker image and push to GCP Kubernetes Engine

## Publishing

### Prerequisites

* Access to GCP Kubernetes Engine via `gcloud` utility
* Working `kubectl` command usage
* Running docker environment

### Automatic SemVer deployment

```sh
$ npm version major|minor|patch
```

## How-to

### Override themes

1. Open `node_modules/antd/es/styles/themes` to find variable to change
2. Override in `.umirc`:
```js
{
  themes: {
    "@...": '...',
  }
}
```
3. If individual antd component need to be updated, check `node_modules/antd/es` to find variable in use

### Add new CAP

1. Open `src/utils/contract.js`
2. Add new CAP name, e.g. `export const CAPP02 = 'capp15eth';`
3. Add new CAP data in `CONTRACT`:
```js
export const CONTRACT = {
  ...
  [CAPP02]: {
    ...
    address: process.env.CAPP02,
    key: CAPP02,
  }
};
```
4. Add new CAP's contract address to `.env.<development|production|staging>`
5. Define e.g. `process.env.CAPP02` in `umi.js`:
```js
{
  ...
  define: {
    ...
    'process.env.CAPP02': process.env.CAPP02,
  }
}
```

### Apply different abi data for CAP

1. Add different `abi.json` to `src/services`
2. Update `src/services/Web3.js` to apply for different CAP
