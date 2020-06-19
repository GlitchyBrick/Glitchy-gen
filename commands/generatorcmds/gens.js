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
      name: "gens",
      group: "generatorcmds",
      memberName: "gens",
      guildOnly: true,
      description: "test"
    });
  }

  run(message) {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Generators: ")
      .setDescription("")
      .addField("=minecraft", "Generates Minecraft Account")
      .addField("=origin", "Generates Origin Account")
      .addField("=crunchyroll", "Generates Crunchyroll Account")
      .addField("=NordVpn", "Generates a Nord Vpn Account")
      .addField("=Disney", "Generates Disney Plus Account")
      .addField("=Hulu", "Generates Hulu Account")
      .addField("=SlingTv", "Generates a SlingTv Account")
      .addField("=Robloxgroup", "Generates a Roblox ")
      .addField("Steam", "Generates a Steam Account ")
      .addField("=Nitro", "Generates a Nitro Code")
      .addField('=acclist', 'Generates an Unchecked Account List')
      .addField('=captcha', 'Solve The Captcha To Get A Random Prize!')
      .addField('=trivia', 'Answer a Question For a Prize')
  
    message.say(exampleEmbed);
  }
};
