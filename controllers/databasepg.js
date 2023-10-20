import pg  from "pg"

const client = new pg.Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "sql",
    database: "StudentDB"
})
client.connect()

export default client;