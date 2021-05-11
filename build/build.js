const path = require("path")

module.exports = {
	models: {
		destDir: path.resolve( __dirname, '../outputs'),
		source:{
			uk: {
				name:'Ukrainian',
				title:"Covid-19 UA",
				description:"lorem ipsum",
				dest: "uk_model.zip",
				url: [
					"https://raw.githubusercontent.com/VasiaPiven/covid19_ua/master/covid19_by_settlement_actual.zip",
                    //
                    //
				]
			},
        }
	}
}