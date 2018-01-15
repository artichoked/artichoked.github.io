# Custom Bootstrap 4 Boilerplate

This boilerplate was created to quickly start any new project using version 4 of the famous [Bootstrap Framework](http://getbootstrap.com/), the [Font Awesome](http://fontawesome.io/) icons and the [Gulp](https://gulpjs.com/) build tool.

## Requirements

* NodeJS 8+
* npm package manager  
* [Gulp](https://gulpjs.com/)

## Installation

**Important for Ubuntu 16.04:**

Run the following command to fix a problem with the file watcher that is used to watch for changes of the SCSS and JS files in your project:

```echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p```

**Installation Steps:**

* Install NodeJS, if you haven't done already. I suggest to use the [Node Version Manager](https://github.com/creationix/nvm) script.
* Update npm to the newest possible version:<br>
 ```npm i -g npm && npm -g update```
* Install a global gulp package:<br>
 ```npm i -g gulp```
* Download the ZIP file from [here](https://github.com/noreading/bootstrap4-custom-boilerplate/archive/master.zip).
* Extract the files to your project directory:<br>
 ```unzip bootstrap4-custom-boilerplate.zip```
* Run the setup script:<br>
 ```npm run setup```

## Editing SCSS and JS

### Watching for file changes

As [Gulp](https://gulpjs.com/) is already loaded and a generic ___Gulpfile___ is in the root project directory, you can use the built-in watcher to compile everything for you, while you edit.

The only thing you need to do is to run the following command in your terminal:

```gulp watch```

### Asset Management

* All assets (SCSS, JavaScript, Images, etc.) should be stored in the "/assets/" directory of your project.
* The SCSS files are located in "/assets/src/scss/" and will be compiled to "/assets/dist/css/".
* The JavaScript files are located in "/assets/src/js/" and the ___app.js___ will be compiled to "/assets/dist/js/app.min.js".
* The Images should be stored in the "/assets/dist/images/" folder.

