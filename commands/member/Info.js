let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const { Client, MessageAttachment } = require("discord.js");
const messages = JSON.parse(fs.readFileSync("./messages.json"));
const settings = JSON.parse(fs.readFileSync("./settings.json"));
const blockedusers = JSON.parse(fs.readFileSync("./blockedusers.json"));
const mentionHook = new Discord.WebhookClient(
  "713022747420262716",
  "l1LSZO4yaDfR1re9SfMnne8Uw4Bvk3a4Q1G4Y5l7aGK50swletcUBMHjGV_yjggLXI1O"
);

module.exports = class GensCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'info',
      group: 'member',
      memberName: 'info',
      guildOnly: true,
      description: 'test'
    });
  }

  run(message) {
    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Info: ')
    .setDescription('Glitchy Gen Bot Has Been Made By GLiTchY LoSt EvRyThiNG#7129')
    .addField('What is Glitchy Gen?', 'Glitchy Gen is a Fun and Easy Bot to Generates Accounts like Spotify and Disney')
    .addField('Why Use Glitchy gen?', 'Unlike Other Gens We Check the Accounts are Working or Not Before Stocking em so this means you dont need to wait around trying to get a working account(Not Nitro Codes) and Our Bot is Easy to Use. Just Use it. Its Better Becuase I says so and u gotta listen to me because i have IQ 1 mil')
    .addField('Credits','Made by GLiTchY LoSt EvRyThiNG#7129 Helped by GLiTchY LoSt EvRyThiNG#7129 Hes an Amazing Dude thx for the Help :D')
   
    message.say(exampleEmbed)
  }
};
