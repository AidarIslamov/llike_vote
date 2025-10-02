import { FastifyInstance } from "fastify";
import { Idea, sequelize, Vote } from "../models";
import { getClientIP } from "../utils/ip";

export default async function ideaRoutes(fastify: FastifyInstance) {
  fastify.get("/idea", {
    handler: async (request, reply) => {
      const clientIP = getClientIP(request);
      if (!clientIP) {
        return reply.status(400).send({
          error: "Client IP address is required",
        });
      }

      const VOTE_LIMIT = parseInt(process.env.VOTE_LIMIT || "10");
      const totalVoteCount = await Vote.count({
        where: { clientIP },
      });

      const ideas = await Idea.scope([
        "withVotesCount",
        { method: ["withEnableVote", clientIP] },
      ]).findAll({
        order: [
          [sequelize.literal('"votesCount"'), 'DESC']
        ]
      });
      return { data: ideas, limitExceeded:  totalVoteCount >= VOTE_LIMIT};
    },
  });
}
