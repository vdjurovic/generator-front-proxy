var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');

var htmlGenerator = generators.Base.extend({
  
 constructor: function() {
   generators.Base.apply(this, arguments);
   // require HTML file name
   this.argument('htmlFileName', {type: String, required: true});
   this.htmlFileName = this.htmlFileName;
   // option to specify title
   this.option("title", {type: String, defaults: 'Untitled'});
 },
 initializing: function(){
   this.appName = this.config.get('appname');
 },
  writing: function(){
     console.log("Creating HTML file " + this.htmlFileName);
     // create HTML page in src directory
     var pageTitle = this.options.title;
     this.fs.copyTpl(this.templatePath('_page.html'), this.destinationPath('src/' + this.htmlFileName), {title: pageTitle, appName: this.appName});
  }
});

module.exports = htmlGenerator;