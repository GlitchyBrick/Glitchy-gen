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

module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: "contact",
      group: "member",
      memberName: "contact",
      guildOnly: true,
      description: "test"
    });
  }

  run(message) {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Contacts:")
      .setDescription(
        "Contact me if you Find any Bugs, Glitchs or If you Have Any Questions or Sugestions :D"
      )
      .addField("Discord Tag", "GLiTchY LoSt EvRyThiNG#7129")
      .addField("Owners Discord Server", "https://discord.gg/wW2frdF")
      .addField(
        "--------------------Socials:--------------------",
        "Follow or Subscribe to Me"
      )
      .addField(
        "YouTube: Glitchy Brick",
        "https://www.youtube.com/channel/UC_oRFNDgK0NvObZXW4PzcVQ"
      )
      .addField("Twitch: GlitchyBrick", "https://www.twitch.tv/glitchybrick")
      .addField("Instagram", "https://www.instagram.com/glitchy_brick/?hl=en")
      .addField("Twitter", "https://twitter.com/GlichyBrick");

    message.say(exampleEmbed);
  }
};
