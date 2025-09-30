import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'

interface IdeaAttributes {
  id: number
  title: string
  createdAt?: Date
  updatedAt?: Date
}

interface IdeaCreationAttributes extends Optional<IdeaAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Idea extends Model<IdeaAttributes, IdeaCreationAttributes> implements IdeaAttributes {
  public id!: number
  public title!: string
  
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Idea.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'ideas',
    timestamps: true
  }
)

export default Idea