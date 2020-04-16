//const Ong = require("../models/Ong");
const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const ongs = await connection('ongs').select('*');

    return response.json({ ongs });
  },
  async create(request, response) {
    const { email } = request.body;
    try {
      const { name, email, whatsapp, city, uf } = request.body;
      const id = await crypto.randomBytes(4).toString('HEX');
      
      await connection('ongs').insert({
        id,
        name, 
        email, 
        whatsapp, 
        city,
        uf
      });

      return response.send({ id });
    } catch(e) {
      console.log(e);
      return response.status(400).send({ error: 'Falha no cadastro de Ong.' });
    }
  }
};