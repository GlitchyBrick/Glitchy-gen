let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const UsedByRecently = new Set();

module.exports = class VoteCommand extends Command {
  constructor(client) {
    super(client, {
      name: "poll",
      group: "admin",
      memberName: "poll",
      guildOnly: false,
      description: "test"
    });
  }

 run(message) {
       if (message.member.hasPermission(["ADMINISTRATOR"])) {

    const args = message.content.slice(";").split(" ");
    const command = args.shift().toLowerCase();
    
    if(!args[0]){
      return message.reply("You Cant Start A Vote Without A Text. So Add One!")
    }

    var argz = "";

    for (var arg in args) {
      var argz = argz + args[arg] + " ";
    }

    if (argz) {
      const exampleEmbed = new Discord.MessageEmbed();
        exampleEmbed.setColor("#ff1100");
        exampleEmbed.setTitle("**POLL**");
        exampleEmbed.setDescription(argz)
        exampleEmbed.setFooter("Poll By " + message.member.user.tag)
      
        message.channel.send("@here\n", exampleEmbed).then(sentEmbed => {
          sentEmbed.react("✅");
          sentEmbed.react("❌");
        });
        message.delete();
        }
       }else message.say("You Need the Administrator Perm")
  }
};
