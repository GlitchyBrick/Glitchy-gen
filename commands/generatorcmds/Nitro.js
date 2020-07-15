let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const { Client, MessageAttachment } = require("discord.js");
const messages = JSON.parse(fs.readFileSync("./messages.json"));
const settings = JSON.parse(fs.readFileSync("./settings.json"));
const blockedusers = JSON.parse(fs.readFileSync("./blockedusers.json"));
const blockedservers = JSON.parse(fs.readFileSync("./blockedservers.json"));
const UsedByRecently = new Set();
const mentionHook = new Discord.WebhookClient(
  "729360447521685586",
  "sRlm5IYmDAUh97HuC6sTPGw_vE2WeRx1v-MlmdsbWB1PqBWpNof7aQO9baiVzygtUesT"
);

module.exports = class NitroCommand extends Command {
  constructor(client) {
    super(client, {
      name: "nitro",
      group: "generatorcmds",
      memberName: "nitro",
      guildOnly: true,
      description: "test",
      throttling: {
        usages: 1,
        duration: 1
      }
    });
  }

  run(message) {
    
    if (settings.Enabled == false) {
      message.say(messages.ServicesDown);
      return;
    }

    if (message.author.id && blockedusers.includes(message.author.id)) {
      message.say(messages.BlockedUser);
      return;
    }
    
      if (message.guild.id && blockedservers.includes(message.guild.id)) {
      message.say(messages.BlockedServers);
      return;
    }
    
    

    
    let fs = require("fs");

    var Nitro_File_Buffer = fs.readFileSync("./Nitro.txt");
    var Nitro_File_Buffer_To_String = Nitro_File_Buffer.toString();
    var Nitro_File_Buffer_Split_Lines = Nitro_File_Buffer_To_String.split("\n");

    var lines = Nitro_File_Buffer_Split_Lines.length - 1;

    if (lines === 0) {
        message.channel
        .createInvite({ maxUses: 0, unique: false, maxAge: 0 })
        .then(invite => {
          message.say(messages.OutOfStock);
        mentionHook.send(
          message.author.toString() +
            " Has Been Listed For DM Delivery For: Nitro" +
            " Issued On: " + invite.code
        );
        });
        return;
      }

    function procced() {
      fs.readFile("./Nitro.txt", function read(err, data) {
        if (err) {
          throw err;
        }

        var rl = data.toString().split("\n");
        var item = rl[Math.floor(Math.random() * rl.length)];
        genlink(item)

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

        fs.writeFile("./Nitro.txt", updatedData, err => {
          if (err) throw err;
        });
      });
    }
    
     function genlink(insidee) {
      message.say("<@" + message.author.id + ">, Check Your DMS! :mailbox:");
      const exampleEmbed = new Discord.MessageEmbed();
      //#0099ff
      exampleEmbed.setColor("GREEN");
      exampleEmbed.setTitle("Nitro Delivery:");
      exampleEmbed.setDescription(insidee);

      message.author.send(exampleEmbed);
    }

    if (UsedByRecently.has(message.author.id)) {
      message.say("Please Wait Before Using That Command!");
      return;
    }

    const genservers = JSON.parse(fs.readFileSync("./genservers.json"));

    var gr = false;

    for (var attributename in genservers) {
      if (message.guild.id === genservers[attributename]["ServerID"]) {
        //procced();
        //message.say("premium");
        if (
          message.member.roles.cache.has(
            genservers[attributename]["settings"]["RoleIDs"]["default"]
          )
        ) {
          if (gr === false) {
            procced();
            gr = true;
            UsedByRecently.add(message.author.id);
            console.log("d");
            setTimeout(() => {
              UsedByRecently.delete(message.author.id);
            }, genservers[attributename]["settings"]["cooldowns"]["default"]);
          }
        } else if (
          message.member.roles.cache.has(
            genservers[attributename]["settings"]["RoleIDs"]["boost"]
          )
        ) {
          if (gr === false) {
            // boost
            console.log("b");
            procced();
            gr = true;
            UsedByRecently.add(message.author.id);
            setTimeout(() => {
              UsedByRecently.delete(message.author.id);
            }, genservers[attributename]["settings"]["cooldowns"]["boost"]);
          }
        } else if (
          message.member.roles.cache.has(
            genservers[attributename]["settings"]["RoleIDs"]["premium"]
          )
        ) {
          if (gr === false) {
            // premium
            console.log("p");
            procced();
            gr = true;
            UsedByRecently.add(message.author.id);
            setTimeout(() => {
              UsedByRecently.delete(message.author.id);
            }, genservers[attributename]["settings"]["cooldowns"]["premium"]);
          }
        } else if (
          message.member.roles.cache.has(
            genservers[attributename]["settings"]["RoleIDs"]["bypass"]
          )
        ) {
          if (gr === false) {
            // premium
            console.log("b2");
            procced();
            gr = true;
            UsedByRecently.add(message.author.id);
            setTimeout(() => {
              UsedByRecently.delete(message.author.id);
            }, 100);
          }
        }
        gr = true;
      }
    }

    setTimeout(() => {
      if (gr === false) {
        // default
        procced();
        gr = true;
        console.log("dd");
        UsedByRecently.add(message.author.id);
        setTimeout(() => {
          UsedByRecently.delete(message.author.id);
        }, genservers[attributename]["settings"]["cooldowns"]["default"]);
      }
    }, 1000);
  }
};
