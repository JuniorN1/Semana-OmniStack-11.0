//import { isIterable } from "core-js";
const  generateUniqueId = require('../../src/utils/gerenateUniqueId');
describe('Generate Unique ID',()=>{
    it('should generate an unique ID',()=>{
        const id = generateUniqueId();
        expect(id).toHaveLength(8);
    });
});