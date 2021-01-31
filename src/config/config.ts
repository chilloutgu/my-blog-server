export const config = () => ({
  port: Number(process.env.SERVER_PORT),
  database: {
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.DB_SYNC,
    entities: ['dist/**/**.entity{.ts,.js}']
  }
})