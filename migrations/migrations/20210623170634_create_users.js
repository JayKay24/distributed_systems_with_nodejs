exports.up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").unsigned().primary();
    table.string("username", 24).unique().notNullable();
  });

  await knex("users").insert([
    { username: "tlhunter" },
    { username: "steve" },
    { username: "Ruth" },
    { username: "James" },
  ]);
};

exports.down = (knex) => {
  knex.schema.dropTable("users");
};
