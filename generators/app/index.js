'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')


const { version } = require('../../package.json')
module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts)
		this.tmpDir = 'rollup-start-kit'
		this.name = ''
	}

	prompting() {
		this.log(yosay(`Welcome to the divine ${chalk.red('generator-rollup-kit')} generator!`))

		const prompts = [
			{
				type: 'input',
				name: 'projectName',
				message: 'Your project name',
				default: 'react-rollup',
			}
		]

		this.log(this.appname.replace(/\s+/g, '-') + ' is getting generated..!')

		return this.prompt(prompts).then(props => {
			this.props = props
			this.name = props.projectName.replace(/\s+/g, '-')
		})
	}

	writing() {
		this.fs.copy(this.templatePath(this.tmpDir + '/'), this.destinationPath(this.destinationRoot(this.name)), {
			globOptions: { dot: true, ignore: ['**/node_modules', '**/package-lock.json'] }
		})

		this.fs.copyTpl(this.templatePath(this.tmpDir + '/package.json'), this.destinationPath('package.json'), {
			name: this.props.projectName.replace(/\s+/g, '-'),
			version:version
		})
	}
	install() {
		this.installDependencies({
			bower: false
		})
	}
}
