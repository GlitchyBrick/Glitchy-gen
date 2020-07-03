const { Command } = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class SayCommand extends Command {
  // Change it to "SayCommand" instad of "GenCommand"
  constructor(client) {
    super(client, {
      name: "embedoptions",
      group: "admin",
      memberName: "embedoptions",
      guildOnly: true,
      description: "test",
      
      
    });
  }

  run(message) {
  
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#00fa11")
      .setTitle("Colour Options For SayEmbed")
      .setDescription("`AQUA`, `GREEN`, `BLUE`, `PURPLE`, `GOLD`, `ORANGE`, `RED`, `GREY`, `DARKER_GREY`, `NAVY`, `DARK_AQUA`, `DARK_GREEN`, `DARK_BLUE`, `DARK_PURPLE`, `DARK_GOLD`, `DARK_ORANGE`, `DARK_RED`, `DARK_GREY`, `LIGHT_GREY`, `DARK_NAVY`, `LUMINOUS_VIVID_PINK`, `DARK_VIVID_PINK`")
      
  
 
    message.say(exampleEmbed);
    
  }
};
