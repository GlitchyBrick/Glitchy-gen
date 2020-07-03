const { Command } = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class SayCommand extends Command {
  // Change it to "SayCommand" instad of "GenCommand"
  constructor(client) {
    super(client, {
      name: "sayembed",
      group: "admin",
      memberName: "sayembed",
      guildOnly: true,
      description: "test",
      args: [
        {
          key: "title",
          prompt: "Please Add A Title.",
          type: "string"
          //validate: givenLink
        },
        {
          key: "msg",
          prompt: "Please Add A MSG.",
          type: "string"
          //validate: givenLink
        },
        {
          key: "colour",
          prompt:
            "Please Add A Colour SAY IN CAPS (Say =Embedoptions For all the Colour Choices)",
          type: "string"
          //validate: givenLink
        }
      ]
    });
  }

  run(message, { msg, title, colour }) {
    message.delete();
    if (message.member.hasPermission(["ADMINISTRATOR"])) {
      const exampleEmbed = new Discord.MessageEmbed();
      // could be: 'BLACK', 'BLUE', 'RED',etc
      if (colour) {
        // if colour: set
        exampleEmbed.setColor(colour);
      } else {
        // if no colour
      }

      if (title) {
        // if title: set
        exampleEmbed.setTitle(title);
      } else {
        // if no title
      }
      if (msg) {
        // if msg: set
        exampleEmbed.setDescription(msg);
      } else {
        // if no msg
      }
      return message.say(exampleEmbed);
    } else {
      message.say('You Are Missing The "ADMINISTRATOR" Permission.');
    }
  }
};
