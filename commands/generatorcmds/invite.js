let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const { Client, MessageAttachment } = require("discord.js");
const messages = JSON.parse(fs.readFileSync("./messages.json"));
const settings = JSON.parse(fs.readFileSync("./settings.json"));
const blockedusers = JSON.parse(fs.readFileSync("./blockedusers.json"));
const mentionHook = new Discord.WebhookClient(
  "713022747420262716",
  "l1LSZO4yaDfR1re9SfMnne8Uw4Bvk3a4Q1G4Y5l7aGK50swletcUBMHjGV_yjggLXI1O"
);
module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: "invite",
      group: "generatorcmds",
      memberName: "invite",
      guildOnly: true,
      description: "test"
    });
  }

  run(message) {
    message.say("Stop Trying to Invite Glitchy Gen. This Bot is Private if You Want the bots Invite Link Boost Glitchy Gen Server");
    message.say("Dm <@456943275757010944> For More Info");
  }
};
