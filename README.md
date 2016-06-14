# generator-front-proxy
*generator-front-proxy* is Yeoman generator which produces skeleton project for developing front-end of web application. Out of the box, it craetes very lightweight 
structure with no included libraries and frameworks, and leaves up to developer to include all needed dependencies. However, it does provide Grunt build file which 
contains pre-configured tasks for common operations, such as testing, minifaction, compression etc.

One distinction for this generator is that it provides out-of-the box proxy server which can be used to invoke remote APIs used by front end. This means that front-end 
developer does not need to have backend server installed on local machine for development. Instead, they can configure proxy server to forward all requests to remote 
backend. This way, front-end developers can focus on front end, and don't worry about setting up backend server, databases, email servers and so on.

## Use cases
Typical use case when this setup can come in handy: you have backend server written in Java/PHP/Python which provides RESTfull API with JSON response data. You need to 
create web frontend for this backend. Using *generator-front-proxy*, you can quickly set up frontend project in which you invoke all remote endpoints as if they are local,
and they are being proxied to remote server behind the scenes.

# Installation
In order to install *generator-front-proxy*, you need to have Yeoman 1.8.4 or higher installed. Then simply install generator by running 

    npm install generator-front-proxy
    
# Creating projects
To create project, simply invoke Yeoman with this generator as argument:

    yo generator-front-proxy
    
Yeoman will ask for the project name and create project structure in the directory named as project name. After the project is created you should first install dependencies,
and the you can start development server:

    npm install
    npm start
    
The first command will install Node dependencies, and the next will start development server. You can try it out by pointing your browser to `http://localhost:8000`.

## Grunt tasks
*generator-front-proxy* provides Grunt build file with pre-configured common tasks:
* test setuo using Karma and Jasmine. Run tests using `grunt test` task
* Bower setup to include dependencies, and also `grunt wiredep` task to include these dependencies in HTML files
* prepare distribution for the project by minifying and compressing output files. Use `grunt dist` task for this (files will be output to `dist` folder)

## Configuring proxy server
Finally, to configure proxy server, you should edit file `config.json` in `server` directory. Byt default, this file contains the following configuration options:
* `targetUrl` - URL of the remote server to which requests will be forwarded 
* `proxyPathPattern` - pattern for requests to be forwarded. For example, if set to `/api*`, all requests that start with `/api` will be forwarded to 
 remote server, while the rest will not
* `rejectUnsignedCerts` - this option is usefull if your backend server uses HTTPS with self-signed certificates. To allow this, set this option to `0` (or `1` otherwise)

## Decorating requests
Sometimes it's required to set additional data to the request being proxied. For example, you may need to set additional headers, request parameters etc. For this, you can 
use function `onDecorateRequest()` in file `server/app.js`. There is already a sample of this provided inside the file.

# Additional options

After the project is created, you can create new HTML pages with pre-configured Bower and minifaction hooks. This makes sure that all your HTML files are correctly processed and 
have correct dependencies.

    yo front-proxy:html home.html --title 'Custom title'
    
This will create new HTML file at `src/home.html` with title *Custom title*. If you do not specify title, it defaults to *Untitled*.


