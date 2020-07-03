const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const portc =
  "The Bot Has Been Hosted in the Website https://glitchybrick.glitch.me/";

module.exports = class PortCommand extends Command {
  constructor(client) {
    super(client, {
      name: "port",
      group: "generatorcmds",
      memberName: "port",
      guildOnly: true,
      description: "test",
      throttling: {
        usages: 1,
        duration: 5
      }
    });
  }

  run(message) {
    message.say(portc);
  }
};
