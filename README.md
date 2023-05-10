# Chrome extension:  manage your energy consumption

This project aim to help end user to manange their energy consumption. The extension is a POC and is not meant to be used in production. This project have been created for a school project at [IMT Atlantique](https://www.imt-atlantique.fr/fr).

![](https://cdn.discordapp.com/attachments/1087036478372196362/1105782109311860756/extension-demo.gif)

## Table of contents
* [General info](#general-info)
* [Setup](#setup)
* [Licence](#licence)

## General Info

### Technologies

* [Angular 15](https://v15.angular.io/docs)
* [SCSS](https://sass-lang.com/)
* [Typescript](https://www.typescriptlang.org/docs/)
* [Rxjs](https://rxjs.dev/)
* [Chrome API](https://developer.chrome.com/docs/extensions/reference/)

### Folders structure

├── src
│   ├── app
|   |   ├── components `all components used in the app`
|   |   ├── services `in charge of the business logic (set active energy consumption, send message to extension) `
│   ├── assets `public files`
│   ├── extension `extension worker related file (update header, listen to messages from service)`
│   ├── scss `all scss variables, functions etc. Can be imported in any scss file using @import 'all.scss';`
|

## Setup

Clone repository

```bash
git clone https://github.com/t0hmi/energy-consumption.git
```

Use the package manager [npm](https://www.npmjs.com/) to install depedencies

```bash
npm install
```

### Build & Add extension in Chrome

#### Build the project

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory. 

#### Add extension in Chrome

You need to load the unpacked extension in developer mode see [documentation](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#:~:text=To%20load%20an%20unpacked%20extension,the%20bottom%20of%20the%20menu.)

When you load `/dist/chrome-extension-manage-energy-consumption` the extension should be visible in your [extensions](chrome://extensions/).

## Licence

[MIT](https://choosealicense.com/licenses/mit/)