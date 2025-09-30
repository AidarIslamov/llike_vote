import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'
import Idea from './Idea'

interface VoteAttributes {
  id: number
  ideaId: number
  clientIP: string
  createdAt?: Date
  updatedAt?: Date
}

interface VoteCreationAttributes extends Optional<VoteAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Vote extends Model<VoteAttributes, VoteCreationAttributes> implements VoteAttributes {
  public id!: number
  public ideaId!: number
  public clientIP!: string
  
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}


Vote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ideaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'idea_id',
      references: {
        model: Idea.tableName,
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    clientIP: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'client_ip'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at' // ← явное указание имени поля в БД
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at' // ← явное указание имени поля в БД
    }
  },
  {
    sequelize,
    tableName: 'votes',
    timestamps: true,
    indexes: [
    {
      unique: true,
      fields: ['client_ip', 'idea_id']
    }
  ]
  }
)

export default Vote