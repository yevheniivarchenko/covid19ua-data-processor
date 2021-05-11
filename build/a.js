//
//
//

const url = config.connection.url

let mongoConnected = false
const connectionTimeout = config.connection.timeout
const tick = 100
let counter = 0

let fs = require("fs")
let Promise = require("bluebird")
const mongo = Promise.promisifyAll(require('mongodb').MongoClient)
const config = require("../config")

let elegantSpinner = require('elegant-spinner');
let frame = elegantSpinner();

let interval = setInterval(function () {
	if( mongoConnected ){
		clearInterval(interval)
	} else {
		if(counter < connectionTimeout) {
			logUpdate(`${frame()} Try connect to ${url}`);
			counter += tick
		} else {
			logUpdate(chalk.red(`Connection failed ${url}`));
			process.exit()	
		}
	}
}, tick);


mongo.connect(url, {
		    useNewUrlParser: true,
		    useUnifiedTopology: true
		 })
		.then( client => {
			mongoConnected = true
		  	//console.log(`Connect to ${url}`)
		  	const db = client.db(config.connection.db)
		  	const collection = db.collection(config.connection.collection)

            let f = client.emit()

		  	collection.findOne({})
		  		.then( res => {
		  			if( !res ){
		  				let counter = 0
			
						require("./async-queue")(
							i => {
								// console.log(`INSTALL VESUM > Load vesum_part_${i}.json`)
								// let vesum = JSON.parse(fs.readFileSync(`./data/vesum-tone/vesum_${i}.json`))
								// let j = 0
								vesum.forEach( r => {
									delete r._id
									counter++
								})
								return collection.insertMany(vesum).then(() => {
									//console.log(`${f}`)
								})	
							}
						)
				// 		.run(23)
				// 		.then(() => {
				// 			
				// 			collection.createIndex("word")
				// 			.then(() => {
				// 			
				// 				client.close()	
				// 			})
				// 		})
		  		// 	} else {
		  		// 		client.close()
		  		// 	}
		  		// })
		  		// .catch( e => {
		  		// 	console.log(`INSTALL VESUM > ${e.toString}`)		
		  		// })
                        }
        
			
		})
		.catch( e => {
			console.log(` ${e.toString}`)
		})	
    }
        )    