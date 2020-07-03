let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const messages = JSON.parse(fs.readFileSync("./messages.json"));
const settings = JSON.parse(fs.readFileSync("./settings.json"));
const mentionHook = new Discord.WebhookClient(
  "704248531606700142",
  "17TR3fO8MiiQLPFon8k-so7C_4d41KmBbuYlYnEHyCeyPX4dEaFxPl1ZLnDdH1PerzbX"
);
const blockedusers = JSON.parse(fs.readFileSync("./blockedusers.json"));

module.exports = class RedeemCommand extends Command {
  constructor(client) {
    super(client, {
      name: "status",
      group: "generatorcmds",
      memberName: "status",
      guildOnly: true,
      description: "test",
      throttling: {
        usages: 1,
        duration: 1
      }
    });
  }

  run(message) {
    if (settings.Enabled == false) {
      message.say(messages.OfflineStatus);
    }

    if (settings.Enabled == true) {
      message.say(messages.OnlineStatus);
    }
  }
};
