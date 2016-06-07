#Tools and Services
This page describes tools and services which are used for this project.

#### About Less
[Less](http://lesscss.org/) is a dynamic stylesheet language that can be compiled into Cascading Style Sheets (CSS), or can run on the client-side and server-side. Its first version was written in Ruby, however in the later versions, use of Ruby has been deprecated and replaced by JavaScript. Less provides the following mechanisms: variables, nesting, mixins, operators, and functions.

More information about the Less functionalities can be found on their's
[getting started page](http://lesscss.org/#getting-started).

Project's Less files are created out of plenty resources, but main parts are borrowed from the [Base Framework](http://getbase.org/) created by Matthew Hartman.

###### Organization of Less folders:
`/source/less folder` contains several folders:  
- components - styles for layout components (like lists, tables, buttons)  
- foundation - base styles  
- helpers - mixins, variables and general css helpers  
- layout - styles for blocks/page sections (header, footer)  
- vendor - styles from installed javascript plugins  

`/source/less/styles.less` file defines which Less files are going to be compiled.

###### Usage of BEM Class Naming Convention:
From a class naming perspective, this project is built upon several principles/guidelines defined within [BEM Methodology](https://en.bem.info/). 

The Block, Element, Modifier methodology (commonly referred to as BEM) is a popular naming convention for classes in HTML and CSS. Developed by the team at Yandex, its goal is to help developers better understand the relationship between the HTML and CSS in a given project.

Basic example of BEM class naming convention:
~~~~~~~~~~~~~~~~~~~~~
HTML code for navigation:
<nav class="page-nav">
    <ul class="page-nav__list">
        <li class="page-nav__item">
            <a href="#" title="#" class="page-nav__link">Nav Link</a>
        </li>
        <li class="page-nav__item">
            <a href="#" title="#" class="page-nav__link page-nav__link--active">Nav Link</a>
        </li>
        <li class="page-nav__item">
            <a href="#" title="#" class="page-nav__link">Nav Link</a>
        </li>
    </ul>
</nav>
~~~~~~~~~~~~~~~~~~~~~

~~~~~~~~~~~~~~~~~~~~~
LESS code for Navigation:
.page-nav {

    &__list {
        list-style: none;
        margin: 0;
        padding: 30px 0;
    }

    &__item {
        margin: 0;
        padding: 0 20px;
        display: inline-block;
        line-height: 1;
        &:first-child {
            padding-left: 0;
        }
        &:last-child {
            padding-right: 0;
        }
    }

    &__link {
        font-weight: @font-weight-regular;
        color: #4a5560;
        padding: 10px 0;
        display: block;

        &--active {
            font-weight: 900;
            color: @color-brand-primary;
            &:hover {
                color: @color-brand-primary;
            }
        }
    }
~~~~~~~~~~~~~~~~~~~~~


#### About Jade
[Jade](http://jade-lang.com/) is a terse language for writing HTML templates. Jade is capable to:
- Produce HTML
- Support dynamic code
- Support reusability (DRY)

Preprocessors are high-level languages that offer syntactical and functional improvements over their "vanilla" (non-preprocessed) counterparts. These high-level languages allow you to write the markup in a better language that is compiled down to normal (vanilla) HTML. Thus, they are there purely to improve your productivity, without affecting their compatibility with existing technologies.
In the case of Jade, this preprocessing is done by compiling templates into JS and then rendering them to HTML. Because Jade's compiled templates really are just JavaScript functions that output HTML, they can be rendered on both the server and in the browser.

###### Organization of Jade files
In this project, Jade is operating as a Grunt task. In `Gruntfile.js` you can see how the organization is defined in this project. 
In short: 
- All Jade pages can be found inside `source/site-pages` folder.
- `config.jade` holds the variables which define certain properties in `pagewrapper.jade` file.
- `pagewrapper.jade` represents a foundation for other Jade pages which are going to be compiled in HTML (these pages `extends pagewrapper` and then they populate the page inside content blocks defined in `pagewrapper.jade` – for e.g. `block page-intro`, or `block page-content`).
- `site-pages/partials` holds repeating page elements like `page-header`, or `page-footer`
- Certain HTML pages may, or may not contain modals, overlays, etc. With `block partials` defined in pagewrapper.jade, these bits of code can be included in certain Jade file via `include partials/modals/modal`.

#### About NPM
[Node.js](https://nodejs.org/) is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.

In order to use grunt task manager Node is required to be installed. With this, grunt tasks defined in package.json will be able to be installed.

#### About Grunt

[Grunt](http://gruntjs.com) is the JavaScript task runner which handles tasks which are defined within the project. In order to use grunt you will need to have it installed on your computer — [how to install grunt](http://gruntjs.com/getting-started) can help you with this chore.

###### Organization of Grunt Tasks:
- List of all tasks which will be installed and run by grunt on this project can be found inside `package.json` file.
- `Gruntfile.js` file holds the information about the tasks which are registered within this project. Defined triggers for certain tasks can be found within this file as well.
- Each Grunt task is annotated, so you will be able to grasp how they operate with no problem.

#####NOTICE:
In order to enable auto page refresh in browser whenever the file is changed [Liverload browser extension](http://livereload.com/) needs to be installed.

###### Additional Information:
* [Issues and Tips](about-grunt/issues-and-tips.md)
* [Suggested Reading List](about-grunt/reading-list.md)

#### About Surge
[Surge](https://surge.sh/) makes it easy for developers to deploy projects to a production-quality CDN.

###### Surge Configuration:
- Install Surge npm package globally with `npm install --global surge`.
- Navigate to your project and type `surge`.
- Create an account by entering your email address and password.
- Confirm the project directory you want to deploy.
- Define the domain name where you want to deploy your project (`project-domain.surge.sh`).
- You can define which folders and files should be ignored for deployment in `.surgeignore` file created in the project root.
- If you want to save project domain name for deployment you can create CNAME file in the project root containing the domain name (`project-domain.surge.sh`).

#### Additional Services: 
- [Favicons Generator](http://realfavicongenerator.net/) — Generate all the necessary favicons.  
- [Less Color Naming Convention](http://chir.ag/projects/name-that-color) — Creative way of naming color variables.  
- [Tinypng (Additional Image Optimization)](https://tinypng.com/) — This service has the best compression algorithm. If you feel that `grunt imagemin` task doesn't provide sufficient image optimization I advise using this service then.