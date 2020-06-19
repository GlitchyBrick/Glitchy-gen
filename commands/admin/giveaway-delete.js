let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const { Client, MessageAttachment } = require("discord.js");
const messages = JSON.parse(fs.readFileSync("./messages.json"))
const settings = JSON.parse(fs.readFileSync("./settings.json"))
const giveawaymanager = require("/app/utils/giveawaymanager.js");
const index = require('/app/index.js')

module.exports = class DMCommand extends Command {
  constructor(client) {
    super(client, {
      name: "gdelete",
      group: "admin",
      memberName: "gdelete",
      guildOnly: true,
      description: "test",
      throttling: {
        usages: 1,
        duration: 1
      },
      args: [
        {
          key: 'msgid',
          prompt: 'MessageID Of Giveaway.',
          type: 'string'
        }
      ]
    });
  }
  
  run(message, { msgid }) {
    
    message.delete()
    
    if (!message.member.hasPermission(["ADMINISTRATOR"])) { return; }
    if(settings.Enabled==false){
      message.say(messages.ServicesDown)
      return;
    }
    giveawaymanager.delete(msgid,message.channel)
  }
};
