module.exports = {

    addPrompts : function(prompts) {
      // nothing for now but here as a placeholder in case we need specific prompts for commonjs mode
    },

    generate : function(parent) {

      //--------copy over main artifacts------
      parent.fs.copyTpl(parent.templatePath('cjs/package.json'),
          parent.destinationPath('package.json'),parent.props);
      parent.fs.copyTpl(parent.templatePath('cjs/gulpfile.js'), 
          parent.destinationPath('gulpfile.js'), parent.props);
      parent.fs.copy(parent.templatePath('cjs/lib/*.js'), 
          parent.destinationPath('.lib'));

      //--------copy over the runtime ---------
      parent.fs.copy(parent.templatePath('cjs/runtime/*'),
          parent.destinationPath('runtime'));

      // --------copy over the service code ---------
      parent.fs.copyTpl(parent.templatePath('cjs/service/**/*'), 
          parent.destinationPath('service'), parent.props);

      // --------copy over Liferay stuff------------------------
      parent.fs.copy(parent.templatePath('cjs/liferay/OSGI-INF/service_defn.xml'),
          parent.destinationPath('.liferay/OSGI-INF/service_defn.xml'));
      parent.fs.copy(parent.templatePath('cjs/liferay/OSGI-INF/lib/*.jar'),
          parent.destinationPath('.liferay/OSGI-INF/lib'));
      parent.fs.copy(parent.templatePath('cjs/liferay/META-INF/MANIFEST.MF'),
          parent.destinationPath('.liferay/META-INF/MANIFEST.MF'));
    }
};