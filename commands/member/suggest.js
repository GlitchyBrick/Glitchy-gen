let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const messages = JSON.parse(fs.readFileSync("./messages.json"));
const settings = JSON.parse(fs.readFileSync("./settings.json"));
const blockedusers = JSON.parse(fs.readFileSync("./blockedusers.json"));
const mentionHook = new Discord.WebhookClient(
  "726785669506138124",
  "U_-Wiq4LD_Frw30nJNFouCNf7DxT7VhEJOkR4-91FWAHYJZ7nymHZLCjjxP-taf4VZ5M"
);

module.exports = class RedeemCommand extends Command {
  constructor(client) {
    super(client, {
      name: "suggest",
      group: "member",
      memberName: "suggest",
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
      message.reply("You Cant Suggest Nothing Bruh!!");
    }

    var argz = "";

    for (var arg in args) {
      var argz = argz + args[arg] + " ";
    }

    const index = require("/app/index.js");
    const client = index.gc("testicol");

    const channel = client.channels.cache.get("726778772417937487");

    if (argz) {
      
      message.channel
        .createInvite({ maxUses: 0, unique: false, maxAge: 0 })
        .then(invite => {
        
      const exampleEmbed = new Discord.MessageEmbed()
      exampleEmbed.setColor("#ff0000");
      exampleEmbed.setTitle("Suggestion: ");
      exampleEmbed.setDescription("An Suggestion Has Been Made For Glitchy Gen");
      exampleEmbed.addField("Suggestion", argz);
      exampleEmbed.addField("You Can See Your Suggestion in:", "https://discord.gg/HdP7Uhv");
      exampleEmbed.setFooter("Suggestion Came From: " + message.author.username + "#" + message.author.discriminator + "\nServer: " + "https://discord.gg/" + invite.code);
      
      message.channel.send(exampleEmbed);
      channel.send(exampleEmbed).then(sentEmbed => {
        sentEmbed.react("✅");
        sentEmbed.react("❌");
      });
        
      })
      

    }
  }
};
