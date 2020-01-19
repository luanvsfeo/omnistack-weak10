const Dev = require('../models/Dev');

const parseString = require('../utils/parseStringAsArray');

module.exports = {

    async index(request,response){
        
        const {latitude,longitude,techs} = request.query;
        

        const techsArray = parseString(techs);

        

        const devs = await Dev.find({
            techs : {
                $in: techsArray,
            },location:{
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates:[longitude,latitude],
                    },
                    $maxDistance: 10000,
                },
            }
        });

        return response.json({devs});
    }


}