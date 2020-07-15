const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
let fs = require("fs");
const { Client, MessageAttachment } = require("discord.js");
const messages = JSON.parse(fs.readFileSync("./messages.json"));
const settings = JSON.parse(fs.readFileSync("./settings.json"));
const blockedusers = JSON.parse(fs.readFileSync("./blockedusers.json"));
const mentionHook = new Discord.WebhookClient(
  "729362400234438746",
  "jyGxFnRTMIt9WcKRIzFCuYMPBNAiSLKPsN5BH0MLGWAL9a9jQF13zy55RQRyqNdaQYd3"
); 

module.exports = class ReportCommand extends Command {
  constructor(client) {
    super(client, {
      name: "report",
      group: "member",
      memberName: "report",
      guildOnly: true,
      description: "test",
      throttling: {
        usages: 1,
        duration: 60 * 5
      }
    });
  }

  run(message) {
    
      if (message.author.id && blockedusers.includes(message.author.id)) {
      message.say(messages.BlockedUser);
      return;
    }
  
    if(settings.Enabled==false){
      message.say(messages.ServicesDown)
      return;
    }
    
        const args = message.content.slice(";").split(" ");
    const command = args.shift().toLowerCase();

    if (!args[0]) {
      message.reply("You Cant Report Nothing Bruh!!");
    }

    var argz = "";

    for (var arg in args) {
      var argz = argz + args[arg] + " ";
    }
    
    if(argz) {
      
      message.channel
        .createInvite({ maxUses: 0, unique: false, maxAge: 0 })
        .then(invite => {
      
      const exampleEmbed = new Discord.MessageEmbed()
      exampleEmbed.setColor("#ff0000");
      exampleEmbed.setTitle("Report: ");
      exampleEmbed.setDescription("An Report Has Been Made For Glitchy Gen");
      exampleEmbed.addField("Report", argz);
      exampleEmbed.addField("You Can See Your Report in:", "https://discord.gg/HdP7Uhv");
      exampleEmbed.setFooter("Report Came From: " + message.author.username + "#" + message.author.discriminator + "\nServer: " + "https://discord.gg/" + invite.code);
      
    mentionHook.send(exampleEmbed);
    message.say(exampleEmbed).then(sentEmbed => {
        sentEmbed.react("✅");
      });
        
     })
    }
  }
};

