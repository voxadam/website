# Dgraph

This is a Dgraph repository which is built with [Lifeboat - Jade](https://bitbucket.org/danijel_grabez/lifeboat-jade).

### Installation
1. Install npm from [here](https://nodejs.org/en/download/package-manager/)

2. Install grunt with `npm install -g grunt-cli`

3. Install required grunt-related libraries with `npm install`.  

### Building the assets

To run main grunt task, use `grunt watch-files` command.  
All assets source files are located in `/source/less, js, images` and built files are located in `/assets/css, js, images`.  
Jade pages are located in `source/site-pages`, while builds *(HTML pages)** are placed in the root directory.  
Inside `assets/js` you can see folder named `unminified` which holds unminified javascript which is used on this project.  

### NOTICE regarding demo/console section
CSS/HTML/JS structure is taken from [adishap](https://github.com/adishap/demoDgraph) who helped isolating this section from the previous Dgraph website version. HTML and CSS is additionally modified in order to adapt the visual style presented in the mockups. Except CSS, we didn't include files in our build process; we placed them in `assets/`:  
- `css/demo-section` – but we didn't reference these files. Since there is a **ton** of unnecessary CSS properties *(~255kb)*, we copied only necessary ones and placed them inside `source/less/vendor/demo-section/_demo-section.less`.  
- `js/demo-section`
- `fonts/demo-section`

### Deploying

* Run `grunt`
* Commit the artifact to `master`
* If CSS has changed, bust the cache by changing the timestamp in the header

### Resources and tools

- [LESS](http://lesscss.org/) — CSS Preprocessor
- [Jade](http://jade-lang.com/) — Jade Templating Language
- [NPM](https://nodejs.org/) — Node Package Manager
- [Grunt.js](http://gruntjs.com/) — JavaScript Task Runner
- [Surge](https://surge.sh/) — Deploy projects to a production-quality CDN

For more information about each of the mentioned tool see [Tools and Services Page](documentation/tools-and-services.md).

### Author
Superawesome Team  
email: dudes@sprawsm.com  
Danijel Grabež  
email: danijel@sprawsm.com
