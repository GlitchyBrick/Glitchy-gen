const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
let fs = require("fs");
const { Client, MessageAttachment } = require("discord.js");
const messages = JSON.parse(fs.readFileSync("./messages.json"));
const settings = JSON.parse(fs.readFileSync("./settings.json"));
const blockedusers = JSON.parse(fs.readFileSync("./blockedusers.json"));
const mentionHook = new Discord.WebhookClient(
  "721949189524815974",
  "-dZlLeTMPJBaGCMzXD8jz-05uheVBRhzFcanpt84u7HYC2TGnnHdc0bjexh9_DRronhM")

module.exports = class ReportCommand extends Command {
  constructor(client) {
    super(client, {
      name: "report",
      group: "generatorcmds",
      memberName: "report",
      guildOnly: true,
      description: "test",
      args: [
        {
          key: "issue",
          prompt: "Please Say The Issue. This is a Warning any False Reports Will conclude in the Bot Banning u This Means u cant use the bot So Dont Make False Claims",
          type: "string"
          //validate: givenLink
        }
      ]
    });
  }

  run(message, { issue }) {
    
    if (message.author.id && blockedusers.includes(message.author.id)) {
      message.say(messages.BlockedUser);
      return;
    }
    
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTitle("Report: ")
      .setDescription("An issue has been Reported For Glitchy Gen")
      .addField("Report Sent By", message.author.toString())
      .addField("Report", issue)
    .addField("You Can See Your Report in:","https://discord.gg/HdP7Uhv")
    mentionHook.send(exampleEmbed);
    message.say(exampleEmbed);
   
  }
};

