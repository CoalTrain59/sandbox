
const { gracefulExecution, expectedErrorExecution, fatalErrorExecution, fatalErrorAlternative } = require('./defines.js');

module.exports = (typeOfExecution) => {

    return new Promise((resolve, reject) => {
        if(typeOfExecution === gracefulExecution) console.log(`Running as execution type: gracefulExecution`);
        else if(typeOfExecution === expectedErrorExecution) console.log(`Running as execution type: expectedErrorExecution`);
        else if(typeOfExecution === fatalErrorExecution) console.log(`Running as execution type: fatalErrorExecution`);
        else if(typeOfExecution === fatalErrorAlternative) console.log(`Running as execution type: fatalErrorExecutionAlternative`)
        
        const getTheDayOption1 = () => {
            return new Promise((resolve, reject) =>{
                console.log("Reaching out to server 1 for what day it is in 3 seconds");
                setTimeout(() => {
                    try{
                        console.log("Reaching out to server 1 for what day it is now.");
                        if(typeOfExecution === gracefulExecution) return resolve({body: {day: "Monday"}})
                        if(typeOfExecution === expectedErrorExecution) return reject(JSON.stringify({body: {error: "Password was wrong."}}))
                        if(typeOfExecution === fatalErrorExecution) throw new Error("Uncaught Fatal Error Occured");
                        if(typeOfExecution === fatalErrorAlternative) throw new Error("Alternative Fatal Error Occured");
                    }catch(error){
                        console.log(`getTheDayOption1: ${error.message}`);
                        reject(error);
                    }
                }, 3000)
            })
        }

        const getTheDayOption2 = () => {
            return new Promise((resolve) =>{
                console.log("Reaching out to Server 2 for what day it is in 3 seconds.");
                setTimeout(() => {
                    console.log("Reaching out to server 2 for what day it is now.");
                    return resolve({body: {day: "Monday"}});
                }, 3000);
            })
        }


        const getTheWeather = (data) => {
            return new Promise((resolve) => {
                console.log("Checking the weather in 3 Seconds.")
                setTimeout(() => {
                    console.log("Checking the weather now.")
                    data.body.weather = 'Sunny'
                    return resolve(data);
                }, 3000)
            })
        }


        getTheDayOption1(typeOfExecution)
        .then(
            (res) => {console.log("Server 1 worked correctly."); return res;},
            (rej) => {
                console.log(`Server 1 rejected my request. It's reason is ${rej}`);
                if(rej?.message === "Uncaught Fatal Error Occured") throw rej;
                return getTheDayOption2()
            }
        ).catch(error => {
            console.log(`Catch: Acknowledge error from getTheDayOption1: ${error.message}`)
            throw error;
        })
        .then(
            (res) => {resolve(getTheWeather(res))}
        )
        .catch((error) => {
            console.log(`Catch: Acknowledge error final: ${error.message}`)
            reject(error.message);
        })
    })    
}