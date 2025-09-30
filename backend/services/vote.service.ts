import { Vote, Idea } from "../models";
import sequelize from "../config/database";

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

      const voteCount = await Vote.count({
        where: { clientIP },
        transaction,
      });

      if (voteCount >= this._VOTE_LIMIT) {
        throw new Error("VOTE_LIMIT_EXCEEDED");
      }

      const idea = await Idea.findByPk(ideaId, { transaction });
      if (!idea) throw new Error("IDEA_NOT_FOUND");

      // Создаем голос - (не орграничиваем кол-во голосов за одну идею)
      const vote = await Vote.create({ ideaId, clientIP }, { transaction });

      await transaction.commit();

      return {
        vote,
        canVote: voteCount + 1 < this._VOTE_LIMIT,
        remainingVotes: this._VOTE_LIMIT - (voteCount + 1),
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
