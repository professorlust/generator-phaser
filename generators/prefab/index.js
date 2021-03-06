const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator {
  initializing() {
    this.log('Creating a new Phaser Prefab.');
    this.projectName = this.config.get('projectName');
  }

  prompting() {
    return this.prompt([
      {
        type: 'list',
        name: 'prefabType',
        message: 'What type of prefab would you like to create?',
        choices: [
          {
            value: 'prefabSprite',
            name: 'prefabSprite'
          },
          {
            value: 'prefabGroup',
            name: 'prefabGroup'
          },
          {
            value: 'prefabTileSprite',
            name: 'prefabTileSprite'
          },
          {
            value: 'prefabEmitter',
            name: 'prefabEmitter'
          },
          {
            value: 'prefabText',
            name: 'prefabText'
          }
        ]
      },
      {
        type: 'input',
        name: 'prefabName',
        message: 'What\'s the name of your new prefab?',
        filter(input) {
          return path.basename(input, '.js');
        },
        validate(input) {
          if (input === '') {
            return 'Prefab name cannot be empty';
          } else {
            return true;
          }
        }
      }
    ]).then(answers => {
      this.prefabType = answers.prefabType;
      this.prefabName = answers.prefabName;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(path.join(`${this.prefabType}.js`)),
      this.destinationPath(path.join('src', 'prefabs', `${this.prefabName}.js`)),
      this
    );
  }
};
