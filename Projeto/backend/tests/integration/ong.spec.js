//import { isIterable } from "core-js";
const  request = require('supertest');
const  app = require('../../src/app');
const  conection = require('../../src/database/connection');
describe('ONG',()=>{
    beforeEach(async()=>{
        await conection.migrate.rollback();
        await conection.migrate.latest();

    });
    afterAll(async()=>{
       await conection.destroy();

    });
    it('Should be able to create a new ONG',async()=>{
        const response = await request(app)
        .post('/ongs')
        //.set('authorization','asas')
        .send({            
                name:"junior",
                email:"contato@mail.com",
                whatsapp:"1234567891",
                city:"Cidade",
                uf:"RN"   
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});