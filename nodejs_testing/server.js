
const retrieveDayAndWeather = require('./retrieveDayAndWeather.js');
const { gracefulExecution, expectedErrorExecution, fatalErrorExecution, fatalErrorAlternative } = require('./defines.js');


const execute = async() => {
    return await retrieveDayAndWeather(fatalErrorAlternative)
}

execute()
.then(
    (res) => {console.log(`The Final Result of the execution is ${JSON.stringify(res)}`)},
    (rej) => {console.log(`server.js: Promise Rejected: ${rej}`)}
)
