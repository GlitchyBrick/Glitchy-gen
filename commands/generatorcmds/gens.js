let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const { Client, MessageAttachment } = require("discord.js");
const messages = JSON.parse(fs.readFileSync("./messages.json"));
const settings = JSON.parse(fs.readFileSync("./settings.json"));
const blockedusers = JSON.parse(fs.readFileSync("./blockedusers.json"));
const mentionHook = new Discord.WebhookClient(
  "729360447521685586",
  "sRlm5IYmDAUh97HuC6sTPGw_vE2WeRx1v-MlmdsbWB1PqBWpNof7aQO9baiVzygtUesT"
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
      .addField("=minecraft", "<:MinecraftIcon:725689108034355280> Generates Minecraft Account <:MinecraftIcon:725689108034355280>")
      .addField("=origin", "<:Origin:725693093667406015> Generates Origin Account <:Origin:725693093667406015>")
      .addField("=crunchyroll", "<:Crunchyroll_Logo:725695458667921429> Generates Crunchyroll Account <:Crunchyroll_Logo:725695458667921429>")
      .addField("=NordVpn", "<:NordVPNIcon:721805063789609051> Generates a Nord Vpn Account <:NordVPNIcon:721805063789609051>")
      .addField("=Disney", "<:Disney:725693050096975902> Generates Disney Plus Account <:Disney:725693050096975902>")
      .addField("=Hulu", "<:Hulu:725693065146400809> Generates Hulu Account <:Hulu:725693065146400809>")
      .addField("=SlingTv", "<:slingtv:725696108159828012> Generates a SlingTv Account <:slingtv:725696108159828012>")
      .addField("=Robloxgroup", "<:RobloxIcon:721757725142548561> Generates a Roblox <:RobloxIcon:721757725142548561>")
      .addField("Steam", "<:SteamIcon:721757725960175616> Generates a Steam Account <:SteamIcon:721757725960175616>")
      .addField('=acclist', 'Generates an Unchecked Account List')
      .addField('=captcha', 'Solve The Captcha To Get A Random Prize!')
      .addField('=trivia', 'Answer a Question For a Prize')
  
    message.say(exampleEmbed);
  }
};
