let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const { Client, MessageAttachment } = require("discord.js");
const messages = JSON.parse(fs.readFileSync("./messages.json"))
const settings = JSON.parse(fs.readFileSync("./settings.json"))
const giveawaymanager = require("/app/utils/giveawaymanager.js");

module.exports = class DMCommand extends Command {
  constructor(client) {
    super(client, {
      name: "gstart",
      group: "admin",
      memberName: "gstart",
      guildOnly: true,
      description: "test",
      throttling: {
        usages: 1,
        duration: 1
      },
      args: [
        {
          key: 'time',
          prompt: 'Duration Of Giveaway.',
          type: 'string'
        },
        {
          key: 'winners',
          prompt: 'Winners Of Giveaway.',
          type: 'string'
        },
        {
          key: 'ch',
          prompt: 'Channel For Giveaway.',
          type: 'channel'
        },
        {
          key: 'prize',
          prompt: 'Prize Of Giveaway.',
          type: 'string'
        }
      ]
    });
  }
  
  run(message, { time, winners, ch, prize }) {
    
    message.delete()
    
    if (!message.member.hasPermission(["ADMINISTRATOR"])) { return; }
    if(settings.Enabled==false){
      message.say(messages.ServicesDown)
      return;
    }
    giveawaymanager.start(time,prize,winners,ch)
  }
};
