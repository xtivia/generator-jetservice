var Generator = require('yeoman-generator');
var yosay = require('yosay');
var fs = require('fs-extra');
var path = require('path');

module.exports = class extends Generator {
  
  initializing() {
    this.log(yosay('Welcome to the JetService generator for \nLiferay 7/DXP!'));
  }
	
  prompting() {

    var self = this;
    
		// generate a random number to append to service name
		// this (probably) keeps those who are just blindly hitting enter
		// from overwriting previous efforts
		var high = 9999; var low=1;
		var randomSuffix = Math.floor(Math.random() * (high - low) + low);
		
		var prompts = [
			  {
          required: true,
          name: 'serviceName',
          message: 'Enter service ID',
          default: 'org.jetservice.svc'+ randomSuffix.toString(),
          validate : function(input) {
            if (input.indexOf(' ') != -1) {
              return "Spaces are not permitted in the service id."
            } else return true;
          }
			  },
        {
          required: true,
          name: 'serviceTitle',
          message: 'Enter service title',
          default: 'org.jetservice.svc'+ randomSuffix.toString()
			  },
			  {
          required: true,
          name: 'servicePath',
          message: 'Enter service URI path',
          default: '/svc'+ randomSuffix.toString(),
          validate : function(input) {
              if (input.indexOf(' ') != -1) {
                return "Spaces are not permitted in the service path."
              } else if (input.indexOf('/') != 0) {
                return "Path must begin with a slash, e.g. /org.jetservice.abcd"
              } else return true;
          }
			  },
        {
          required: true,
          name: 'sgdxp',
          type: 'confirm',
          default: false,
          message: 'Include Service Guard?'
        }
		];

    return this.prompt(prompts)
			.then((answers) => {
				self.props = answers;
				self.config.set(self.props);
			});
  }

  writing() {
    
    this.props.serviceFileName = 'index.js';
    this.config.set(this.props);
    
    this.fs.copyTpl(this.templatePath('jaxrs/settings.gradle'),
        this.destinationPath('settings.gradle'), this.props);
    this.fs.copy(this.templatePath('jaxrs/gradle.properties'),
        this.destinationPath('gradle.properties'));
    this.fs.copy(this.templatePath('jaxrs/deploy.jar'),
        this.destinationPath('buildlibs/deploy.jar'));

    if (this.props.sgdxp) {
      this.fs.copy(this.templatePath('jaxrs/sgdxp/sgdxp.jar'),
          this.destinationPath('sgdxp/sgdxp.jar'));
      this.fs.copy(this.templatePath('jaxrs/sgdxp/sgdxp.README'),
          this.destinationPath('sgdxp/README'));
      this.fs.copy(this.templatePath('jaxrs/sgdxp/build.gradle'),
          this.destinationPath('build.gradle'));
      this.fs.copyTpl(this.templatePath('jaxrs/sgdxp/*.java'),
          this.destinationPath('src/main/java/org/jetservice'), this.props);
    } else {
      this.fs.copy(this.templatePath('jaxrs/build.gradle'),
          this.destinationPath('build.gradle'));
      this.fs.copyTpl(this.templatePath('jaxrs/src/*.java'),
          this.destinationPath('src/main/java/org/jetservice'), this.props);
    }
  }
  
}
