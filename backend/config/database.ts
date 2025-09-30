import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgresql://developer:password@localhost:5432/logic_like',
  {
    logging: false,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
)

export default sequelize