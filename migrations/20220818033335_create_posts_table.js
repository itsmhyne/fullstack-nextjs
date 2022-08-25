/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('posts', function (table) {
        table.increments();
        table.string('title');
        table.text('content');
        table.timestamps(true, true);
        table.integer('created_by').nullable;
        table.integer('updated_by').nullable;
        table.integer('status');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('posts');
};
