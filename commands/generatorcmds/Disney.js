let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const messages = JSON.parse(fs.readFileSync("./messages.json"));
const settings = JSON.parse(fs.readFileSync("./settings.json"));
const blockedusers = JSON.parse(fs.readFileSync("./blockedusers.json"));
const blockedservers = JSON.parse(fs.readFileSync("./blockedservers.json"));
const UsedByRecently = new Set();
const mentionHook = new Discord.WebhookClient(
  "729360447521685586",
  "sRlm5IYmDAUh97HuC6sTPGw_vE2WeRx1v-MlmdsbWB1PqBWpNof7aQO9baiVzygtUesT"
);

module.exports = class CrunchyrollCommand extends Command {
  constructor(client) {
    super(client, {
      name: "disney",
      group: "generatorcmds",
      memberName: "disney",
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

    
    var Disney_FileBuffer = fs.readFileSync("./Disney.txt");
    var Disney_File_Buffer_To_String = Disney_FileBuffer.toString();
    var Disney_File_Buffer_Split_Lines = Disney_File_Buffer_To_String.split(
      "\n"
    );

    var lines = Disney_File_Buffer_Split_Lines.length - 1;

    if (lines === 0) {
        message.channel
        .createInvite({ maxUses: 0, unique: false, maxAge: 0 })
        .then(invite => {
          message.say(messages.OutOfStock);
        mentionHook.send(
          message.author.toString() +
            " Has Been Listed For DM Delivery For: Disney" +
            " Issued On: " + invite.code
        );
        });
        return;
      }


    function procced() {
      fs.readFile("./Disney.txt", function read(err, data) {
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

        fs.writeFile("./Disney.txt", updatedData, err => {
          if (err) throw err;
        });
      });
    }
    
    function genlink(insidee) {
      message.say("<@" + message.author.id + ">, Check Your DMS! :mailbox:");
      const exampleEmbed = new Discord.MessageEmbed();
      //#0099ff
      exampleEmbed.setColor("GREEN");
      exampleEmbed.setTitle("Disney Delivery:");
      exampleEmbed.setDescription(insidee);

      message.author.send(exampleEmbed);
    }

    if (UsedByRecently.has(message.author.id)) {
      message.say("Please Wait Before Using That Command!");
      return;
    }

    const genservers = JSON.parse(fs.readFileSync("/app/genservers.json"));

  
    var gr = false;

    for (var attributename in genservers) {
      
      const defaultrole = genservers[attributename]["settings"]["RoleIDs"]["default"]
      const premiumrole = genservers[attributename]["settings"]["RoleIDs"]["premium"]
      const boosterrole = genservers[attributename]["settings"]["RoleIDs"]["boost"]
      const bypassrole = genservers[attributename]["settings"]["RoleIDs"]["bypass"]
        
      const defaultcooldown = genservers[attributename]["settings"]["cooldowns"]["default"]
      const premiumcooldown = genservers[attributename]["settings"]["cooldowns"]["premium"]
      const boostercooldown = genservers[attributename]["settings"]["cooldowns"]["boost"]
      
      if (message.guild.id === genservers[attributename]["ServerID"]) {
        
        //if(typeof defaultrole === "undefined" || typeof premiumrole === "undefined" || typeof boosterrole === "undefined" || typeof bypassrole === "undefined"){ return console.error("Invalid Role IDs")}
        
        if(message.member.roles.cache.has(defaultrole)){
          procced();
          UsedByRecently.add(message.author.id);
          setTimeout(() => {
            UsedByRecently.delete(message.author.id);
          }, defaultcooldown);
          return console.log("Default")
        }
        
        if(message.member.roles.cache.has(premiumrole)){
          procced();
          UsedByRecently.add(message.author.id);
          setTimeout(() => {
            UsedByRecently.delete(message.author.id);
          }, premiumcooldown);
          return console.log("Premium")
        }
        
        if(message.member.roles.cache.has(boosterrole)){
          procced();
          UsedByRecently.add(message.author.id);
          setTimeout(() => {
            UsedByRecently.delete(message.author.id);
          }, boostercooldown);
          return console.log("Booster")
        }
        
        if(message.member.roles.cache.has(bypassrole)){
          procced();
          return console.log("Bypass")
        }
      }
    }
    setTimeout(() => {
      procced();
      UsedByRecently.add(message.author.id);
      setTimeout(() => {
        UsedByRecently.delete(message.author.id);
      }, 300000);
      return console.log("Not Server Default")
    }, 1000)
  }
};