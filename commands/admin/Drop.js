let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const { Client, MessageAttachment } = require("discord.js");
const messages = JSON.parse(fs.readFileSync("./messages.json"));
const settings = JSON.parse(fs.readFileSync("./settings.json"));
const blockedusers = JSON.parse(fs.readFileSync("./blockedusers.json"));
const mentionHook = new Discord.WebhookClient(
  "721949069005553686",
  "i4KZ-05o2ijvdQZONuLFVAJlaYhqvA0pVLz6Vsa_JY13mychgDEKcYsohOo7xhLbjPFa"
);

module.exports = class DropCommand extends Command {
  constructor(client) {
    super(client, {
      name: "drop",
      group: "generatorcmds",
      memberName: "drop",
      guildOnly: true,
      description: "test",
      throttling: {
        usages: 1,
        duration: 1
      },
      args: [
        {
          key: "link",
          prompt: "Please Add A Link.",
          type: "string"
          //validate: givenLink
        }
      ]
    });
  }

  run(message, { link }) {
    if(settings.Enabled==false){
      message.say(messages.ServicesDown)
      return;
    }
    message.delete();
    if (message.member.hasPermission(["MANAGE_MESSAGES"])) {
      message.say("<@&713843008919044156>");
      const exampleEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Drop Time!")
        .addField("Drop", link)
        .setDescription("Drop By " + message.author.toString())
        .setFooter(
          "Message " + message.member.user.tag + " For More Information!"
        );
      message.say(exampleEmbed);
    } else {
      message.say(messages.MissingManageMessagesPerm);
    }
  }
};
