let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const { Client, MessageAttachment } = require("discord.js");
const db = require("quick.db")
module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: "costomstatus",
      group: "generatorcmds",
      memberName: "costomstatus",
      guildOnly: true,
      description: "test"
    });
  }

  run(message) {
    
    //OWNER ONLY COMMAND
    if(!message.author.id === "505795166309842965") {
      return message.channel.send("This command can only be used by owner")
    }
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
   message.channel.send("Updated the bot status")
    process.exit(1);

    
    
  }
}
