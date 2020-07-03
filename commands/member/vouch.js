let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const messages = JSON.parse(fs.readFileSync("./messages.json"));
const settings = JSON.parse(fs.readFileSync("./settings.json"));
const blockedusers = JSON.parse(fs.readFileSync("./blockedusers.json"));
const mentionHook = new Discord.WebhookClient(
  "725815239031128601",
  "OSr9FW7Igk0FX3T2uBP8YQ-BfkNJg7KFAcBkPLp4kydMBPl3qh9bIkUOu8UPvvF7Zoys"
);

module.exports = class RedeemCommand extends Command {
  constructor(client) {
    super(client, {
      name: "vouch",
      group: "member",
      memberName: "vouch",
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

    if (settings.Enabled == false) {
      message.say(messages.ServicesDown);
      return;
    }
    if (settings.MemberCMDS == false) {
      message.say(messages.MemberDown);
      return;
    }

    const args = message.content.slice(";").split(" ");
    const command = args.shift().toLowerCase();

    if (!args[0]) {
      message.reply("You Need to add a Msg With Your Vouch");
    }

    var argz = "";

    for (var arg in args) {
      var argz = argz + args[arg] + " ";
    }

    const index = require("/app/index.js");
    const client = index.gc("testicol");

    const channel = client.channels.cache.get("726778772417937484");

    if (argz) {
      
      message.channel
        .createInvite({ maxUses: 0, unique: false, maxAge: 0 })
        .then(invite => {
        
      const exampleEmbed = new Discord.MessageEmbed()
      exampleEmbed.setColor("#ff0000");
      exampleEmbed.setTitle("Vouch: ");
      exampleEmbed.setThumbnail(message.author.displayAvatarURL())
      exampleEmbed.setDescription("An Vouch Has Been Made By " + message.author.username + "#" + message.author.discriminator);
      exampleEmbed.addField("Message From User", argz);
      exampleEmbed.setTimestamp()
      exampleEmbed.setFooter("Vouch Came From https://discord.gg/" + invite.code, 'https://cdn.glitch.com/2a0a3e33-f2b8-43ce-9c36-2ffd8bd97c3a%2Fglitchy_brick.jpg?v=1589198677464')
      message.channel.send(exampleEmbed);
      channel.send(exampleEmbed).then(sentEmbed => {
        sentEmbed.react("♥️");
      });
        
      })
      

    }
  }
};
