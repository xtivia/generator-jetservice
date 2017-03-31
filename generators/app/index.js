var Generator = require('yeoman-generator');
var yosay = require('yosay');
var fs = require('fs-extra');
var path = require('path');

var cjs = require('./cjs');
var jaxrs = require('./jaxrs');

module.exports = class extends Generator {
	
  prompting() {
	  
    var done = this.async();
		
		this.log(yosay('Welcome to the JetService generator for \nLiferay 7/DXP!'));
    
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
			  }
        // {
        // required: true,
        // name: 'framework',
        // type: 'list',
        // message: 'Service Framework?',
        // choices: ['JAXRS','CommonJS'],
        // default: 'JAXRS'
        // }
		];

    // --- set up JAX-RS prompts ----
    jaxrs.addPrompts(prompts);
		
		this.prompt(prompts, function (props) {
		  this.props = props;
		  done();
		}.bind(this));
  }

  writing() {
	  
    this.props.framework = 'JAXRS';
    this.props.serviceFileName = 'index.js';
    this.config.set(this.props);

    if (this.props.framework == 'CommonJS') {
      cjs.generate(this);
    }

    if (this.props.framework == 'JAXRS') {
      jaxrs.generate(this);
    }
    
  }

  install() {

    if (this.props.framework == 'CommonJS') {
      this.log("Initializing the project--this may take a few minutes...");
      this.npmInstall();
    }
  }
  
}
