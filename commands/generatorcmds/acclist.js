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
      name: "acclist",
      group: "generatorcmds",
      memberName: "acclist",
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

    var Acc_File_Buffer = fs.readFileSync("./Acclist.txt");
    var Acc_File_Buffer_To_String = Acc_File_Buffer.toString();
    var Acc_File_Buffer_Split_Lines = Acc_File_Buffer_To_String.split(
      "\n"
    );
    
    var lines = Acc_File_Buffer_Split_Lines.length-1
    
    if (lines === 0) {
        message.channel
        .createInvite({ maxUses: 0, unique: false, maxAge: 0 })
        .then(invite => {
          message.say("It Looks Like the Bot Ran Out of Account Lists");
        
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
      fs.readFile("./Acclist.txt", function read(err, data) {
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

        fs.writeFile("./Acclist.txt", updatedData, err => {
          if (err) throw err;
        });
      });
    }
    
     function genlink(inside) {
      const linkmanager = require("/app/utils/linkmanager.js");
      function getl() {
        let code = "";
        let dict =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (var i = 0; i < 50; i++) {
          code = code + dict.charAt(Math.floor(Math.random() * dict.length));
        }
        return code;
      }
      var g = getl()
      if (!linkmanager.exists(g + ".json")) {
        linkmanager.create(g + ".json", g, inside);
        var rnlink = linkmanager.get(g + ".json");
        rnlink.inside = inside;
        rnlink.link = g;
        linkmanager.update(g + ".json", rnlink);
        var ix = require("/app/index.js");
        setTimeout(() => {
          message.say(
            "<@" + message.author.id + ">, Check Your DMS! :mailbox:"
          );
          const exampleEmbed = new Discord.MessageEmbed();
          //#0099ff
          exampleEmbed.setColor("GREEN");
          exampleEmbed.setTitle("Delivery:");
          exampleEmbed.setDescription(
            "Click There To [Claim](http://glitchy-gen.glitch.me/" +
              g +
              ")"
          );

          message.author.send(exampleEmbed);
          ix.rlinks();
        }, 1000);
      } else {
        genlink(inside);
      }
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
        gr = true;
        //message.say("premium");
        if (!message.member.roles.cache.has(genservers[attributename]["settings"]["RoleIDs"]["premium"]) && !message.member.roles.cache.has(genservers[attributename]["settings"]["RoleIDs"]["boost"]) && !message.member.roles.cache.has(genservers[attributename]["settings"]["RoleIDs"]["bypass"]) && message.member.roles.cache.has(genservers[attributename]["settings"]["RoleIDs"]["default"])
        ) {
          // default
          procced();
          gr = true;
          UsedByRecently.add(message.author.id);
          console.log("d");
          setTimeout(() => {
            UsedByRecently.delete(message.author.id);
          }, genservers[attributename]["settings"]["cooldowns"]["default"]);
        }
        if (!message.member.roles.cache.has(genservers[attributename]["settings"]["RoleIDs"]["default"]) && !message.member.roles.cache.has(genservers[attributename]["settings"]["RoleIDs"]["premium"]) && !message.member.roles.cache.has(genservers[attributename]["settings"]["RoleIDs"]["bypass"]) && message.member.roles.cache.has(genservers[attributename]["settings"]["RoleIDs"]["boost"])
        ) {
          // boost
          console.log("b");
          procced();
          gr = true;
          UsedByRecently.add(message.author.id);
          setTimeout(() => {
            UsedByRecently.delete(message.author.id);
          }, genservers[attributename]["settings"]["cooldowns"]["boost"]);
        }
        if (!message.member.roles.cache.has(genservers[attributename]["settings"]["RoleIDs"]["default"]) && !message.member.roles.cache.has(genservers[attributename]["settings"]["RoleIDs"]["boost"]) && !message.member.roles.cache.has(genservers[attributename]["settings"]["RoleIDs"]["bypass"]) && message.member.roles.cache.has(genservers[attributename]["settings"]["RoleIDs"]["premium"])
        ) {
          // premium
          console.log("p");
          procced();
          gr = true;
          UsedByRecently.add(message.author.id);
          setTimeout(() => {
            UsedByRecently.delete(message.author.id);
          }, genservers[attributename]["settings"]["cooldowns"]["premium"]);
        }
        if (!message.member.roles.cache.has(genservers[attributename]["settings"]["RoleIDs"]["default"]) && !message.member.roles.cache.has(genservers[attributename]["settings"]["RoleIDs"]["boost"]) && !message.member.roles.cache.has(genservers[attributename]["settings"]["RoleIDs"]["premium"]) && message.member.roles.cache.has(genservers[attributename]["settings"]["RoleIDs"]["bypass"])
        ) {
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
    }

    setTimeout(() => {
      if (gr === false) {
        // default
        procced();
        gr = true;
        console.log("d");
        UsedByRecently.add(message.author.id);
        setTimeout(() => {
          UsedByRecently.delete(message.author.id);
        }, genservers[attributename]["settings"]["cooldowns"]["default"]);
      }
    }, 1000);
  }
};
