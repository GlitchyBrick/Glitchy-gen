let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const { Client, MessageAttachment } = require("discord.js");
const messages = JSON.parse(fs.readFileSync("./messages.json"));
const settings = JSON.parse(fs.readFileSync("./settings.json"));
const blockedusers = JSON.parse(fs.readFileSync("./blockedusers.json"));
const blockedservers = JSON.parse(fs.readFileSync("./blockedservers.json"));
const mentionHook = new Discord.WebhookClient(
  "729360447521685586",
  "sRlm5IYmDAUh97HuC6sTPGw_vE2WeRx1v-MlmdsbWB1PqBWpNof7aQO9baiVzygtUesT"
);

module.exports = class CaptchaCommand extends Command {
  constructor(client) {
    super(client, {
      name: "trivia",
      group: "generatorcmds",
      memberName: "trivia",
      guildOnly: false,
      description: "test",
      throttling: {
        usages: 1,
        duration: 24 * 60 * 60 // 24 hours
      }
    });
  }

  run(message) {
    if (settings.TriviaEnabled == false) {
      message.say(messages.TriviaDown);
      return;
    }
    
      if (message.guild.id && blockedservers.includes(message.guild.id)) {
      message.say(messages.BlockedServers);
      return;
    }

    let availableprizesfile = [
      "./nordvpn.txt",
      "./origin.txt",
      "./crunchyroll.txt"
    ];

    let availableprizesname = [
      "NordVPN Account",
      "Origin Account",
      "Crunchyroll Account"
    ];

    var randomnum = Math.floor(Math.random() * availableprizesname.length);
    var itemname = availableprizesname[randomnum];
    var itemfile = availableprizesfile[randomnum];

    function give() {
      var FileBuffer = fs.readFileSync(itemfile);
      var File_Buffer_To_String = FileBuffer.toString();
      var File_Buffer_Split_Lines = File_Buffer_To_String.split("\n");

      var lines = File_Buffer_Split_Lines.length - 1;

      if (lines === 0) {
        message.channel
          .createInvite({ maxUses: 0, unique: false, maxAge: 0 })
          .then(invite => {
            message.say(messages.OutOfStock);
            mentionHook.send(
              message.author.toString() +
                " Has Been Listed For DM Delivery For: " +
                itemname +
                " For Solving Trivia. Issued On: " +
                invite.code
            );
          });
        return;
      }
      fs.readFile(itemfile, function read(err, data) {
        if (err) {
          throw err;
        }

        var rl = data.toString().split("\n");
        var item = rl[Math.floor(Math.random() * rl.length)];
        genlink(itemname, item);

        const searchKeyword = item; // we are looking for a line, contains, key word 'user1' in the file
        let lastIndex = -1; // let say, we have not found the keyword

        for (let index = 0; index < rl.length; index++) {
          if (rl[index].includes(searchKeyword)) {
            // check if a line contains the 'user1' keyword
            lastIndex = index; // found a line includes a 'user1' keyword
            break;
          }
        }

        rl.splice(lastIndex, 1); // remove the keyword 'user1' from the data Array

        const updatedData = rl.join("\n");

        fs.writeFile(itemfile, updatedData, err => {
          if (err) throw err;
        });
      });
    }

    function genlink(itn,insidee) {
      message.say("<@" + message.author.id + ">, Check Your DMS! :mailbox:");
      const exampleEmbed = new Discord.MessageEmbed();
      //#0099ff
      exampleEmbed.setColor("GREEN");
      exampleEmbed.setTitle(itn + " Delivery:");
      exampleEmbed.setDescription(insidee);

      message.author.send(exampleEmbed);
    }

    var code = "What is the Last Month";
    var answer = "december";

    const exampleEmbed = new Discord.MessageEmbed();
    //#0099ff
    exampleEmbed.setColor("GREEN");
    exampleEmbed.setTitle("Trivia Time:");
    exampleEmbed.setDescription(
      "Solve The Trivia Question And Get A Prize! (You Got 20 Seconds No Caps)"
    );
    exampleEmbed.addField("Queation:", code);

    message.say(exampleEmbed);

    //creates a message collector only looking for messages by the author for 25 seconds
    const collector = new Discord.MessageCollector(
      message.channel,
      m => m.author.id === message.author.id,
      { time: 25000 }
    );

    //this runs as soon as the author writes a message
    collector.on("collect", async message => {
      console.log(message.content); //logs the users message
      if (message.content === answer) {
        message.say("Analyzing Response....").then(msg => {
          setTimeout(function() {
            if (settings.TriviaEndPoint == false) {
              msg.edit(messages.TriviaEndPointUnavailable);
              return;
            } else {
              msg.edit("You Got It Right!");
              give();
            }
          }, 2000);
        });
      } else {
        message.say("Analyzing Response....").then(msg => {
          setTimeout(function() {
            msg.edit("NOOOO! You Got It Wrong :/");
          }, 2000);
        });
      }

      collector.stop(); //stops the collector
    });
  }
};
