import { Vote, Idea } from "../models";
import sequelize from "../config/database";
import { isSequelizeError } from "../utils/typeGuards";

export class VoteService {
  private static _VOTE_LIMIT = parseInt(process.env.VOTE_LIMIT || "10");

  static get VOTE_LIMIT() {
    return this._VOTE_LIMIT;
  }

  static async createVote(ideaId: number, clientIP: string) {
    const lockKey = clientIP
      .split(".")
      .reduce((acc, octet) => (acc << 8) + parseInt(octet), 0);

    const transaction = await sequelize.transaction();

    try {
      await sequelize.query("SELECT pg_advisory_xact_lock(1, $1)", {
        bind: [lockKey],
        transaction,
      });

      const totalVoteCount = await Vote.count({
        where: { clientIP },
        transaction,
      });

      if (totalVoteCount >= this._VOTE_LIMIT) {
        throw new Error("VOTE_LIMIT_EXCEEDED");
      }

      const idea = await Idea.findByPk(ideaId, { transaction });
      if (!idea) throw new Error("IDEA_NOT_FOUND");

      const vote = await Vote.create({ ideaId, clientIP }, { transaction });

      await transaction.commit();

      return {
        vote,
        canVote: totalVoteCount + 1 < this._VOTE_LIMIT,
        remainingVotes: this._VOTE_LIMIT - (totalVoteCount + 1),
      };
    } catch (error) {
      await transaction.rollback();

      if (
        isSequelizeError(error) &&
        error.name === "SequelizeUniqueConstraintError"
      ) {
        throw new Error("ALREADY_VOTED_FOR_IDEA");
      }
      throw error;
    }
  }
}
