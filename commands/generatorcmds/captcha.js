let fs = require("fs");
const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const { Client, MessageAttachment } = require("discord.js");
const messages = JSON.parse(fs.readFileSync("./messages.json"));
const settings = JSON.parse(fs.readFileSync("./settings.json"));
const blockedusers = JSON.parse(fs.readFileSync("./blockedusers.json"));
const mentionHook = new Discord.WebhookClient(
  "721948763605827594",
  "shAwFWj151m0Kf8VRiaYkXh-iHRh0gTia1cXia0bozBQDToErjuz9PN9LARuECBnt7Is"
);

module.exports = class CaptchaCommand extends Command {
  constructor(client) {
    super(client, {
      name: "captcha",
      group: "generatorcmds",
      memberName: "captcha",
      guildOnly: false,
      description: "test",
      throttling: {
        usages: 1,
        duration: 10 * 60 // 10 Minutes
      }
    });
  }

  run(message) {
    if (settings.CaptchaEnabled == false) {
      return message.say(messages.CaptchaDown);
      
    }
    
    if (settings.Enabled === false) {
      return message.say(messages.ServicesDown);
    }

    let availableprizesfile = [
      "./robloxgroups.txt",
      "./nordvpn.txt",
      "./origin.txt"
    ];

    let availableprizesname = [
      "Roblox Group",
      "NordVPN Account",
      "Origin Account"
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
            " For Solving Captcha. Issued On: " + invite.code
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
        genlink(itemname,item)

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
    
     function genlink(itn,inside) {
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
        rnlink.inside = itn + ': ' + inside;
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
            "Click There To [Claim](https://glitchy-gen.glitch.me/" +
              g +
              ")"
          );

          message.author.send(exampleEmbed);
          ix.rlinks();
        }, 1000);
      } else {
        genlink(itn,inside);
      }
    }

    function makecode() {
      let code = "";
      let dict =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      for (var i = 0; i < 5; i++) {
        code = code + dict.charAt(Math.floor(Math.random() * dict.length));
      }
      return code;
    }

    var code = makecode();

    const exampleEmbed = new Discord.MessageEmbed();
    //#0099ff
    exampleEmbed.setColor("GREEN");
    exampleEmbed.setTitle("Captcha:");
    exampleEmbed.setDescription(
      "Solve The Captcha And Get A Prize! Type The Letters You See Below! (You Got 20 Seconds)"
    );
    exampleEmbed.setImage(
      "https://flamingtext.com/net-fu/proxy_form.cgi?script=crafts-logo&fontname=typewriter+from+hell&text=" +
        code +
        "+&_loc=generate&imageoutput=true"
    );

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
      if (message.content === code) {
        message.say("Analyzing Response....").then(msg => {
          setTimeout(function() {
            if (settings.CaptchaEndPoint == false) {
              msg.edit(messages.CaptchaEndPointUnavailable);
              return;
            } else {
              msg.edit("You Got It Right!");
              give();
            }
          }, 2000)
        });
      } else {
        message.say("Analyzing Response....").then(msg => {
          setTimeout(function() {
            msg.edit("NOOOO! You Got It Wrong :/ The Code Was: '" + code + "'");
          }, 2000);
        });
      }

      collector.stop(); //stops the collector
    });
  }
};
