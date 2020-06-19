// Main Module For './userfiles'

let fs = require("fs");
const giveawaymanager = require("/app/utils/giveawaymanager.js");

const index = require("/app/index.js");

var moe = {
  start: function(time, prize, winners, channel) {
    if (!time || !prize || !winners || !channel) {
      return;
    }
    const client = index.gc("testicol");
    const ms = require("ms");
    client.giveawaysManager.start(channel, {
      time: ms(time),
      prize: prize,
      winnerCount: parseInt(winners),
      messages: {
        giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
        giveawayEnded: "🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
        timeRemaining: "Time remaining: **{duration}**!",
        inviteToParticipate: "React with 🎉 to participate!",
        winMessage: "Congratulations, {winners}! You won **{prize}**!",
        embedFooter: "Giveaways",
        noWinner: "Giveaway cancelled, no valid participations.",
        hostedBy: "Hosted by: {user}",
        winners: "winner(s)",
        endedAt: "Ended at",
        units: {
          seconds: "seconds",
          minutes: "minutes",
          hours: "hours",
          days: "days",
          pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
        }
      }
    });
  },
  reroll: function(msgid, channel) {
    if (!msgid || !channel) {
      return;
    }
    const client = index.gc("testicol");
    client.giveawaysManager
      .reroll(msgid)
      .then(() => {
        channel.send("Success! Giveaway rerolled!");
      })
      .catch(err => {
        channel.send(
          "No giveaway found for " + msgid + ", please check and try again"
        );
      });
  },
  delete: function(msgid, channel) {
    if (!msgid || !channel) {
      return;
    }
    const client = index.gc("testicol");
    client.giveawaysManager
      .delete(msgid)
      .then(() => {
        channel.send("Success! Giveaway deleted!");
      })
      .catch(err => {
        channel.send(
          "No giveaway found for " + msgid + ", please check and try again"
        );
      });
  }
};

for (var key in moe) {
  module.exports[key] = moe[key];
}
