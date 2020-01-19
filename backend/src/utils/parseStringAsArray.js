module.exports = function parseStringAsArray(arrayasstring){

    return arrayasstring.split(',').map(tech => tech.trim());


}