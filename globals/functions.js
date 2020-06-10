import GLOBALVARIABLES from './variables'
import * as axios from 'react-native-axios';

module.exports = {

    fetchServants: async () => {
        await axios.get('http://18.197.158.213/servants')
        .then(({data}) => {
            let servantsAmount = 0;
            let salary = 0;
            data.servants.forEach(servant => {
                servantsAmount += parseInt(servant.amount, 10);
                salary += parseInt((servant.salary * servant.amount), 10)
            });
            GLOBALVARIABLES.totalAmountOfServants = servantsAmount;
            GLOBALVARIABLES.totalSalary = salary;
            GLOBALVARIABLES.servants = data.servants;
        })
        .catch(error => {
            console.log("THIS IS AN ERROR: " + error)
        })
    },

    updateServants: async (id, newAmount) => {
        await axios.put('http://18.197.158.213/servants/'+id, {
            amount: newAmount
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log("THIS IS AN ERROR: " + error)
        })
    },

    fetchResources: async () => {
        await axios.get('http://18.197.158.213/resources')
        .then(({data}) => {
            GLOBALVARIABLES.resources = data.resources;
        })
        .catch(error => {
            console.log("THIS IS AN ERROR: " + error)
        })
    },

    updateResources: async (id, newAmount) => {
        await axios.put('http://18.197.158.213/resources/'+id, {
            amount: newAmount
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log("THIS IS AN ERROR: " + error)
        })
    },

    
    fetchFunctions: async () => {
        await axios.get('http://18.197.158.213/functions')
        .then(({data}) => {
            GLOBALVARIABLES.functions = data.functions;
        })
        .catch(error => {
            console.log("THIS IS AN ERROR: " + error)
        })
    },

    updateFunctions: async (id, newAmount) => {
        await axios.put('http://18.197.158.213/functions/'+id, {
            amount: newAmount
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log("THIS IS AN ERROR: " + error)
        })
    },

    gatherAllResources: async () => {

        let newAmountOfStone = 0;
        let newAmountOfWood = 0;

        await GLOBALVARIABLES.servants.forEach(servant => {
            switch (servant.name) {

                case "skogshuggare":
                    GLOBALVARIABLES.totalProducedWood = servant.amount * servant.production_amount
                    
                    break;

                case "stenhuggare":
                    GLOBALVARIABLES.totalProducedStone = servant.production_amount * servant.amount
                    break;

                default:
                    break;
            }
        });

        await GLOBALVARIABLES.resources.forEach(resource => {
            if (resource.name == "trä") {
                newAmountOfWood = parseInt(resource.amount,10)
                newAmountOfWood += parseInt(GLOBALVARIABLES.totalProducedWood,10)

                axios.put('http://18.197.158.213/resources/'+resource.id, {
                    amount: newAmountOfWood
                })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log("THIS IS AN ERROR: " + error)
                })

            } else if (resource.name == "sten") {
                newAmountOfStone = parseInt(resource.amount,10)
                newAmountOfStone += parseInt(GLOBALVARIABLES.totalProducedStone,10)
                axios.put('http://18.197.158.213/resources/'+resource.id, {
                    amount: newAmountOfStone
                })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log("THIS IS AN ERROR: " + error)
                })
            }
        })
    },
}