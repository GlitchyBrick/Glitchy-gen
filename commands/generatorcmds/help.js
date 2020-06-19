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
      name: "help",
      group: "generatorcmds",
      memberName: "help",
      guildOnly: true,
      description: "test"
    });
  }

  run(message) {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Help Menu:")
      .setDescription("**Generator Help**\n`=Gens`\n`=stock`\n`=captcha`\n`=trivia`\n\n**Mod Help**\n`=gstart, =greroll, =gdelete`\n`=drop`\n`=sayembed, =embedoptions`\n`=say`\n`=poll`\n\n**General Help**\n`=info`\n`=contact`\n`=invite`\n`=port`\n`=report`\n`=status`")
 
    message.say(exampleEmbed);
  }
};
