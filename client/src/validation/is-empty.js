//new way of writing a function
//isEmpty is a function whose parameter is value
const isEmpty = value => 
value === undefined ||
value === null ||
(typeof value === 'object' && Object.keys(value).length === 0) ||
(typeof value === 'string' && value.trim().length === 0) 

export default isEmpty