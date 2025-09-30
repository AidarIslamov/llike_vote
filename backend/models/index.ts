import sequelize from '../config/database'
import Idea from './Idea'
import Vote from './Vote'

Idea.hasMany(Vote, { foreignKey: 'ideaId', as: 'votes', onDelete: 'CASCADE' })
Vote.belongsTo(Idea, { foreignKey: 'ideaId', as: 'idea' })


export {
  sequelize,
  Idea,
  Vote
}