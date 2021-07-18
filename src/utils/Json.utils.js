

// Method to check if json is empty 
const isEmptyJsonObject = (obj) => {
    return (obj && Object.keys(obj).length === 0 && obj.constructor === Object);
}

export default {
    isEmptyJsonObject
}