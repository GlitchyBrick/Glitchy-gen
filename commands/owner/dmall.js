let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const { Client, MessageAttachment } = require("discord.js");

module.exports = class DMCommand extends Command {
  constructor(client) {
    super(client, {
      name: "dmall",
      group: "owner",
      memberName: "dm",
      guildOnly: true,
      description: "test"
    });
  }

  run(message) {
    if (message.author.id === "505795166309842965") {
      let dmGuild = message.guild;
      let role = message.mentions.roles.first();
      var msg = message.content;

      const args = message.content.slice("-").split(" ");
      const command = args.shift().toLowerCase();

      if (typeof args[0] === "undefined") {
        return;
      }

      var argz = "";

      argz = args.join(" ");

      if (argz) {
        const client = require("/app/index.js").gc("BotSync");
        var sent = {};
        client.guilds.cache.forEach(guildd => {
          guildd.members.cache.forEach(member => {
            if (!member.user.bot) {
              if (typeof sent[member.user.id] === "undefined") {
                member.user.send(argz);
                sent[member.user.id] = member.user.id;
                console.log(
                  (sent[member.user.username] = member.user.username)
                );
              }
            }
          });
          //guildd.members.cache.forEach(member => zalist[guildd.id][member.user.id] = {"ID":member.user.id});
        });
      }
    } else message.reply("You Cant Use This Command");
  }
};
