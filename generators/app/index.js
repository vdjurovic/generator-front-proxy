var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');

var frontProxyGenerator = generators.Base.extend({
  
  prompting: function(){
    
    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'Project name',
      default: 'my-project'
    }
      
    ];
    return this.prompt(prompts).then(function(answers){
      this.appName = answers.appName;
      
    }.bind(this));
  },
  writing: function(){
    console.log("Scaffolding project...");
    // create and populate 'server' directory
    var target_server_dir = this.appName + '/server';
    var target_css_dir = this.appName + '/src/css';
    var target_js_dir = this.appName + '/src/js';
    var target_img_dir = this.appName + '/src/images';
    mkdirp.sync(this.destinationPath(target_server_dir));
    this.fs.copy(this.templatePath('server/*'), this.destinationPath(target_server_dir));
    // create and populate 'src' directory
    mkdirp.sync(this.destinationPath(target_css_dir));
    this.fs.copy(this.templatePath('src/css/*'), this.destinationPath(target_css_dir));
    mkdirp.sync(this.destinationPath(target_js_dir));
    this.fs.copy(this.templatePath('src/js/*'), this.destinationPath(target_js_dir));
    mkdirp.sync(this.destinationPath(target_img_dir));
    this.fs.copy(this.templatePath('src/images/*'), this.destinationPath(target_img_dir));
    this.fs.copy(this.templatePath('src/favicon.ico'), this.destinationPath(this.appName + '/src/favicon.ico'));
    this.fs.copyTpl(
      this.templatePath('src/index.html'),
      this.destinationPath(this.appName + '/src/index.html'),
      {appName: this.appName}
    );
    // copy test files
    mkdirp.sync(this.destinationPath(this.appName + '/test/spec'));
    this.fs.copy(this.templatePath('test/karma.conf.js'), this.destinationPath(this.appName + '/test/karma.conf.js'));
    this.fs.copy(this.templatePath('test/spec/*'), this.destinationPath(this.appName + '/test/spec'));
    // copy config files
    this.fs.copyTpl(this.templatePath('_bower.json'), this.destinationPath(this.appName + '/bower.json'),{appname: this.appName});
    this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath(this.appName + '/package.json'),{appname: this.appName});
    this.fs.copy(this.templatePath('_gruntfile.js'), this.destinationPath(this.appName + '/Gruntfile.js'));
  }
});

module.exports = frontProxyGenerator;