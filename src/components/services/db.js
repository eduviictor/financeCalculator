const SQLite = require('react-native-sqlite-storage');


const db = SQLite.openDatabase({
	name: 'calculadora.db',
	location: 'default',
	createFromLocation: '~calculadora.db'
});

export default db;