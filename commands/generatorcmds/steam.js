let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const { Client, MessageAttachment } = require("discord.js");
const messages = JSON.parse(fs.readFileSync("./messages.json"));
const settings = JSON.parse(fs.readFileSync("./settings.json"));
const blockedusers = JSON.parse(fs.readFileSync("./blockedusers.json"));
const UsedByRecently = new Set();
const mentionHook = new Discord.WebhookClient(
  "721948763605827594",
  "shAwFWj151m0Kf8VRiaYkXh-iHRh0gTia1cXia0bozBQDToErjuz9PN9LARuECBnt7Is"
);

module.exports = class MinecraftCommand extends Command {
  constructor(client) {
    super(client, {
      name: "steam",
      group: "generatorcmds",
      memberName: "steam",
      guildOnly: true,
      description: "test",
      throttling: {
        usages: 1,
        duration: 1
      }
    });
  }

  run(message) {
    let fs = require("fs");

    var Steam_File_Buffer = fs.readFileSync("./Steam.txt");
    var Steam_File_Buffer_To_String = Steam_File_Buffer.toString();
    var Steam_File_Buffer_Split_Lines = Steam_File_Buffer_To_String.split(
      "\n"
    );
    
    var lines = Steam_File_Buffer_Split_Lines.length-1
    
    if (lines === 0) {
        message.channel
        .createInvite({ maxUses: 0, unique: false, maxAge: 0 })
        .then(invite => {
          message.say(messages.OutOfStock);
        mentionHook.send(
          message.author.toString() +
            " Has Been Listed For DM Delivery For: Steam" +
            " Issued On: " + invite.code
        );
        });
        return;
      }
    
     if(settings.Enabled==false){
      message.say(messages.ServicesDown)
      return;
    }

    
    if(message.author.id && blockedusers.includes(message.author.id)){
       message.say(messages.BlockedUser)
       return;
     }

    
    function procced() {
      fs.readFile("./Steam.txt", function read(err, data) {
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

        fs.writeFile("./Steam.txt", updatedData, err => {
          if (err) throw err;
        });
      });
    }
    
     function genlink(insidee) {
      message.say("<@" + message.author.id + ">, Check Your DMS! :mailbox:");
      const exampleEmbed = new Discord.MessageEmbed();
      //#0099ff
      exampleEmbed.setColor("GREEN");
      exampleEmbed.setTitle("Delivery:");
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

