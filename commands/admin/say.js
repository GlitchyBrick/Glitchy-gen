const { Command } = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class SayCommand extends Command {
  // Change it to "SayCommand" instad of "GenCommand"
  constructor(client) {
    super(client, {
      name: "say",
      group: "admin",
      memberName: "say",
      guildOnly: true,
      description: "test",
      args: [
        {
          key: "msg",
          prompt: "Please Add A MSG.",
          type: "string"
          //validate: givenLink
        }
      ]
    });
  }

  run(message, { msg }) {
    message.delete();
    if (message.member.hasPermission(["ADMINISTRATOR"])) {
      return message.say(msg);
    } else {
      message.say('You Are Missing The "ADMINISTRATOR" Permission.');
    }
  }
};
