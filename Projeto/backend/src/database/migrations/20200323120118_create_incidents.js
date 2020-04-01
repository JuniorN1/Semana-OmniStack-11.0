
exports.up = function(knex) {
   return knex.schema.createTable('incidents',function(table){
        table.increments();
        table.string('titulo').notNullable();
        table.string('description').notNullable();
        table.string('value').notNullable();
        table.string('ong_id').notNullable();
        table.foreign('ong_id').references('id').inTable('ongs');
  
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('incidents');
};
