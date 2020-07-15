let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const { Client, MessageAttachment } = require("discord.js");
const db = require("quick.db")
module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: "121006",
      group: "owner",
      memberName: "costomstatus",
      guildOnly: true,
      description: "test"
    });
  }

  run(message) {
    message.delete()
      //ARGUMENT
    const args = message.content.slice(";").split(" ");
    const command = args.shift().toLowerCase();

    if (args) {
      if (args[0]) {
        // First Argument
        var arg1 = args[0].toLowerCase();
      } else {
        return;
      }
    } else {
      return;
    }
    
 db.set(`status`, args.join(" "))
   message.reply("Updated the bot status")
    process.exit(1);

   
  }
}