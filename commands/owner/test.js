const { Command } = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class TestCommand extends Command {
  constructor(client) {
    super(client, {
      name: "test",
      group: "owner",
      memberName: "test",
      guildOnly: true,
      description: "test"
    });
  }
  run(message) {
     //OWNER ONLY COMMAND
    if(!message.author.id === "505795166309842965") {
      return message.channel.send("This command can only be used by owner")
    }
    if(!message.author.id === "554316146200018964") {
      return message.channel.send("This command can only be used by owner")
    }

      message.say("e").then(sentEmbed => {
        sentEmbed.react("<:tenoutoften:721665102495088680>");
      });
  
  }
};
