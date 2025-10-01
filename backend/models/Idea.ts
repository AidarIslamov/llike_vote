import {
  DataTypes,
  HasManyCountAssociationsMixin,
  Model,
  Optional,
} from "sequelize";
import sequelize from "../config/database";

interface IdeaAttributes {
  id: number;
  title: string;
  votesCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IdeaCreationAttributes
  extends Optional<
    IdeaAttributes,
    "id" | "createdAt" | "updatedAt" | "votesCount"
  > {}

class Idea
  extends Model<IdeaAttributes, IdeaCreationAttributes>
  implements IdeaAttributes
{
  public id!: number;
  public title!: string;

  public votesCount?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
    },
  },
  {
    sequelize,
    tableName: "ideas",
    timestamps: true,
    scopes: {
      withVotesCount: {
        attributes: {
          include: [
            [
              sequelize.literal(
                `(SELECT COUNT(*) FROM votes WHERE votes.idea_id = "Idea"."id")`
              ),
              "votesCount",
            ],
          ],
        },
      },
      // Экранирование на уровне драйвера БД
      withEnableVote: (clientIP: string) => ({
        attributes: {
          include: [
            [
              sequelize.literal(`(
                SELECT NOT EXISTS (
                  SELECT 1 FROM votes 
                  WHERE votes.idea_id = "Idea"."id" 
                  AND votes.client_ip = $1
                )
              )`),
              "enableVote",
            ],
          ],
        },
        bind: [clientIP],
      }),
    },
  }
);

export default Idea;
