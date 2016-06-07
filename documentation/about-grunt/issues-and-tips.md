## Issues and the Solutions
List of issues which I encountered while working with grunt

#### 1. Image Optimization
Image optimization didn't work when all packages were installed with only `npm install` command.  
In this situation, one should remove `grunt-contrib-imagemin` package and install it over again.

#####Resources:#####
- [Remove grunt task](http://stackoverflow.com/questions/19914189/proper-way-to-remove-components-tasks-from-yeoman-grunt)
- [Issue solver](http://stackoverflow.com/questions/22398262/can-not-optimize-images-inside-of-the-folder-with-grunt-imagemin)

#### 2. Postcss + Sourcemaps
Right now there is an issue with showing the less file location of certain css style in browser inspector. 

#### 3. These articles solved a couple of issues I had in the beginning:
- [Proper way to remove grunt task from project](http://stackoverflow.com/questions/19914189/proper-way-to-remove-components-tasks-from-yeoman-grunt)
- [Reload html page when css/js/img file is changed](http://stackoverflow.com/questions/18969776/how-to-use-grunt-live-reload-to-reload-html-when-another-file-such-as-css-or-js)


## Useful Hints
- **Remote debugging** can be enabled with [ngrok tool](https://ngrok.com/) — needs `grunt-connect` (or any local server)
- **Grunt Contrib Connect** only works while grunt is running.
    When grunt stop working server stop as well.  
    There is a `keepalive` option which can handle this issue. Also, you can bind this task with, for example, `grunt-watch` task which will enable sever to be active.

    #####UPDATE:  
    Connecting `grunt-watch` with `grunt-connect` gives really slow task completion.  
    This issue is solved by:  

    - Setting the `keepalive` option, and  
    - Running two separate tasks (`grunt-watch` and `grunt-connect` — two different terminal screens are needed).

