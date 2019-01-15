const cuid = require('cuid')
const random = require('lodash/random')

let scoreboard = {}

module.exports = {
  Query: {
    getRecord: (_, { id }) => scoreboard[id] || { wins: 0, losses: 0 },
    challenger: async (_, { id }, { getChallenger }) => {
      return await getChallenger(id)
    }
  },

  Mutation: {
    fight: async (_, { leftId, rightId }, { getChallenger }) => {
      if (!rightId)
        throw new Error("No right challenger.")

      if (!leftId)
        throw new Error("No left challenger.")

      const left = await getChallenger(leftId)
      const right = await getChallenger(rightId)

      if (!scoreboard[leftId])
        scoreboard[leftId] = { wins: 0, losses: 0 }

      if (!scoreboard[rightId])
        scoreboard[rightId] = { wins: 0, losses: 0 }

      let rounds = 0
      while (left.damage < left.hitPoints && right.damage < right.hitPoints) {
        right.damage += random(0, left.attack)
        left.damage += random(0, right.attack)
        rounds++
      }

      let winner = left.damage > left.hitPoints && right.damage > right.hitPoints
        ? null
        : left.damage > left.hitPoints
          ? right
          : left;

      if (winner) {
        scoreboard[left.id][winner.id === left.id ? 'wins' : 'losses']++
        scoreboard[right.id][winner.id === right.id ? 'wins' : 'losses']++
      }

      return {
        id: cuid(),
        rounds,
        winner: winner.id,
        winnerAvatarUrl: winner.avatarUrl,
        right,
        left
      }
    }
  },
  Subscription: {
    blowByBlow: {
      subscribe: (_, __, { pubsub }) => {
        const channel = Math.random().toString(36).substring(2, 15) // random channel name
        let count = 0
        setInterval(() => pubsub.publish(channel, nextRound()), 500)
        return pubsub.asyncIterator(channel)
      },
    }
  },
  Challenger: {
    record: ({ id }) => scoreboard[id] || { wins: 0, losses: 0 }
  }
}
