let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const { Client, MessageAttachment } = require("discord.js");
const messages = JSON.parse(fs.readFileSync("./messages.json"));
const settings = JSON.parse(fs.readFileSync("./settings.json"));
const blockedusers = JSON.parse(fs.readFileSync("./blockedusers.json"));

module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: "invite",
      group: "member",
      memberName: "invite",
      guildOnly: true,
      description: "test"
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
   if(settings.MemberCMDS==false){
      message.say(messages.MemberDown)
      return;
    }
    
const exampleEmbed = new Discord.MessageEmbed()
.setTitle("BOT INVITE LINK")
.setColor("#00ff1e")
.setAuthor("Glitchy Gen", "https://cdn.glitch.com/2a0a3e33-f2b8-43ce-9c36-2ffd8bd97c3a%2Fglitchy_brick.jpg?v=1589198677464")
.setURL("https://discord.com/api/oauth2/authorize?client_id=719926795255677280&permissions=8&scope=bot")
.setDescription("**Click On The Blue Title Above to Invite Glitchy Gen to Your Server :D**")
.setTimestamp()
.setFooter("Made By GLiTchY LoSt EvRyThiNG#7129")
message.say(exampleEmbed)
    
    
    
    
  }
};
