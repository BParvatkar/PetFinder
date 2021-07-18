

// Method to calcuate age in months
const calculateAge = (birthDateString) => {
    var birthDate = new Date(birthDateString);
    var currentDate = Date.now()
    var days = (currentDate - birthDate) / (1000*60*60*24)
    var months = days / 30;
    return Math.round(months);
}


export default {
    calculateAge
}