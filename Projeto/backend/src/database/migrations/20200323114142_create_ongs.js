
exports.up = function(knex) {
    return knex.schema.createTable('tes',function(table){
        table.string('ijd').primary();
        
    });
  };
  
  exports.down = function(knex) {
      knex.schema.dropTable('ongs');
  };
  