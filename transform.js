const babel = require('babel-core')

const myPlugin = require('./myBabel')
const sample = require('./sample')

const result = babel.transform(sample, {
	'presets':[
		[
			"es2015",
			{
				"modules": false
			}
		],
		'react'
	],
	'plugins':[
		myPlugin,
		'transform-class-properties'
	]
})


console.log(result.code)