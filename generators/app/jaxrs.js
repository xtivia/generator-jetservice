module.exports = {

    addPrompts : function(prompts) {
      var sgdxpPrompt = {
        required: true,
        name: 'sgdxp',
        type: 'confirm',
        default: false,
        message: 'Include Service Guard?',
        // when: function (response) {
        //   return response.framework == 'JAXRS';
        // }
      };
      prompts.push(sgdxpPrompt);
    },

    generate : function(parent) {

      parent.fs.copyTpl(parent.templatePath('jaxrs/settings.gradle'),
          parent.destinationPath('settings.gradle'), parent.props);
      parent.fs.copy(parent.templatePath('jaxrs/gradle.properties'),
          parent.destinationPath('gradle.properties'));
      parent.fs.copy(parent.templatePath('jaxrs/deploy.jar'),
          parent.destinationPath('buildlibs/deploy.jar'));

      if (parent.props.sgdxp) {
        parent.fs.copy(parent.templatePath('jaxrs/sgdxp/sgdxp.jar'),
            parent.destinationPath('sgdxp/sgdxp.jar'));
        parent.fs.copy(parent.templatePath('jaxrs/sgdxp/sgdxp.README'),
            parent.destinationPath('sgdxp/README'));
        parent.fs.copy(parent.templatePath('jaxrs/sgdxp/build.gradle'),
            parent.destinationPath('build.gradle'));
        parent.fs.copyTpl(parent.templatePath('jaxrs/sgdxp/*.java'),
            parent.destinationPath('src/main/java/org/jetservice'), parent.props);
      } else {
        parent.fs.copy(parent.templatePath('jaxrs/build.gradle'),
            parent.destinationPath('build.gradle'));
        parent.fs.copyTpl(parent.templatePath('jaxrs/src/*.java'),
            parent.destinationPath('src/main/java/org/jetservice'), parent.props);
      }

    }
};