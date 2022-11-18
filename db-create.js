import { knexConfig } from "./src/config/knex.js";
import knex from 'knex'

const db = knex(knexConfig)

const up = async function (knex) {
  const existsTableMessages = await knex.schema.hasTable('messages')
  if (!existsTableMessages) {
    await knex.schema
      .createTable('messages', (table) => {
        table.increments();
        table.string('email', 50);
        table.text('text', 'longtext');
        table.date('date');
      })
  }

  const existsTableProducts = await knex.schema.hasTable('products')
  if (!existsTableProducts) {
    await knex.schema
      .createTable('products', (table) => {
        table.increments();
        table.string('title', 50);
        table.float('price');
        table.text('thumbnail')
      })
  }

  db.destroy()
}

up(db);