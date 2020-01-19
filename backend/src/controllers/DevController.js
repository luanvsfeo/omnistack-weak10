const axios = require('axios');
const Dev = require('../models/Dev');
const parseString = require('../utils/parseStringAsArray');
const { findConnections,sendMessage} = require('../webSocket');

module.exports = {

    async index(request,response){
        const devs = await Dev.find(); 

        return response.json(devs)
    },

    async store (request,response) {
        const {github_username, techs,latitude,longitude} = request.body;
    
        let dev = await Dev.findOne({github_username});

        if(!dev){
            const apiresponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
        const {bio,avatar_url,name = login} = apiresponse.data;
        
        
        const techsArray = parseString(techs);
    
        const location = {
            type : 'Point',
            coordinates : [longitude,latitude],
        }
    

        dev =  await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        });
    
        const sendSocketMessageTo = findConnections(
            {latitude,longitude},
            techsArray,
            )

            sendMessage(sendSocketMessageTo,'new-dev',dev);
        }

        return response.json(dev);
    },
        

    async delete(request,response){
    },
    
    async update(request,response){

    }
};