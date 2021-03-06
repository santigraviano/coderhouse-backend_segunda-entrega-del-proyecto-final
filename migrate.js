import 'dotenv/config'
import knex from 'knex'
import config from './config.js'

(async () => {

  const db = knex({
    client: process.env.SQL_DRIVER,
    connection: config[process.env.SQL_DRIVER],
    useNullAsDefault: true
  })
  
  try {
    await db.schema.dropTableIfExists('products')
    await db.schema.createTable('products', table => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.string('code').notNullable()
      table.string('image').notNullable()
      table.decimal('price').notNullable()
      table.integer('stock').defaultTo(0)
      table.timestamp('timestamp').defaultTo(db.fn.now());
    })

    await db.schema.dropTableIfExists('carts')
    await db.schema.createTable('carts', table => {
      table.increments('id')
      table.json('products').defaultTo(JSON.stringify([]))
      table.timestamp('timestamp').defaultTo(db.fn.now());
    })
    console.log('Migrations ran successfully')
  }
  catch (e) {
    console.error(e.message, e.stack)
  }
  finally {
    db.destroy()
  }

})()