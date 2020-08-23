let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const { Client, MessageAttachment } = require("discord.js");

module.exports = class DMCommand extends Command {
  constructor(client) {
    super(client, {
      name: "adtest",
      group: "owner",
      memberName: "adtest",
      guildOnly: true,
      description: "test",
      args: [
        {
          key: "user",
          prompt: "Which user do you want to Ban?",
          type: "user"
        }
      ]
    });
  }

  run(message, { user }) {
    const embed = new Discord.MessageEmbed();
    embed.setTitle("JOIN THIS SERVER FOR NITRO")
    embed.setDescription("This Server is Legit i Got Working Nitro Out of it :o")
    embed.setImage('https://cdn.glitch.com/49c68949-9f41-41d9-ac18-29bf2b339079%2Fb930bba7-6c28-4a44-9a91-7267e5c86dfd.image.png?v=1597822404498')
    embed.setTimestamp()
    embed.setFooter('Powered By Glitchy Brick Bot')
    user.send(embed);
    
  }
};