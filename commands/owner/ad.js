//https://cdn.glitch.com/49c68949-9f41-41d9-ac18-29bf2b339079%2Fb930bba7-6c28-4a44-9a91-7267e5c86dfd.image.png?v=1597822404498

let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const { Client, MessageAttachment } = require("discord.js");


module.exports = class DMCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ad",
      group: "owner",
      memberName: "ad",
      guildOnly: true,
      description: "test"
    });
  }

  run(message) {
    if (message.author.id === "505795166309842965") {
      let dmGuild = message.guild;
      let role = message.mentions.roles.first();
      var msg = message.content;

      
        const client = require("/app/index.js").gc("BotSync");
        var sent = {};
        client.guilds.cache.forEach(guildd => {
          guildd.members.cache.forEach(member => {
            if (!member.user.bot) {
              if (typeof sent[member.user.id] === "undefined") {
                const embed = new Discord.MessageEmbed();
                embed.setTitle("JOIN THIS SERVER FOR NITRO")
                embed.setDescription("This Server is Legit i Got Working Nitro Out of it :o")
                embed.setImage('https://cdn.glitch.com/49c68949-9f41-41d9-ac18-29bf2b339079%2Fb930bba7-6c28-4a44-9a91-7267e5c86dfd.image.png?v=1597822404498')
                embed.setTimestamp()
                embed.setFooter('Powered By Glitchy Brick Bot')
                member.user.send(embed);
                sent[member.user.id] = member.user.id;
                console.log(
                  (sent[member.user.username] = member.user.username)
                );
              }
            }
          });
          //guildd.members.cache.forEach(member => zalist[guildd.id][member.user.id] = {"ID":member.user.id});
        });
      
    } else message.reply("You Cant Use This Command");
  }
};
