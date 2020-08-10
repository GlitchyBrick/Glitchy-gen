const { Command } = require('discord.js-commando');
const Discord = require('discord.js');


module.exports = class StockCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'stock',
      group: 'generatorcmds',
      memberName: 'stock',
      guildOnly: true,
      description: 'test'
    });
  }
  

  run(message) {
    var fs = require('fs');
    
    var Minecraft_File_Buffer =  fs.readFileSync("./minecraft.txt");
    var Minecraft_File_Buffer_To_String = Minecraft_File_Buffer.toString();
    var Minecraft_File_Buffer_Split_Lines = Minecraft_File_Buffer_To_String.split("\n");
    
    var Origin_FileBuffer =  fs.readFileSync("./origin.txt");
    var Origin_File_Buffer_To_String = Origin_FileBuffer.toString();
    var Origin_File_Buffer_Split_Lines = Origin_File_Buffer_To_String.split("\n");
    
    var Crunchyroll_FileBuffer =  fs.readFileSync("./crunchyroll.txt");
    var Crunchyroll_File_Buffer_To_String = Crunchyroll_FileBuffer.toString();
    var Crunchyroll_File_Buffer_Split_Lines = Crunchyroll_File_Buffer_To_String.split("\n");
    
    var Nordvpn_FileBuffer =  fs.readFileSync("./nordvpn.txt");
    var Nordvpn_File_Buffer_To_String = Nordvpn_FileBuffer.toString();
    var Nordvpn_File_Buffer_Split_Lines = Nordvpn_File_Buffer_To_String.split("\n");
    
    var Disney_FileBuffer =  fs.readFileSync("./Disney.txt");
    var Disney_File_Buffer_To_String = Disney_FileBuffer.toString();
    var Disney_File_Buffer_Split_Lines = Disney_File_Buffer_To_String.split("\n");
  
    var Hulu_FileBuffer =  fs.readFileSync("./Hulu.txt");
    var Hulu_File_Buffer_To_String = Hulu_FileBuffer.toString();
    var Hulu_File_Buffer_Split_Lines = Hulu_File_Buffer_To_String.split("\n");
  
    var Robloxg_FileBuffer =  fs.readFileSync("./Robloxgroup.txt");
    var Robloxg_File_Buffer_To_String = Robloxg_FileBuffer.toString();
    var Robloxg_File_Buffer_Split_Lines = Robloxg_File_Buffer_To_String.split("\n");
    
    var Acc_FileBuffer =  fs.readFileSync("./Acclist.txt");
    var Acc_File_Buffer_To_String = Acc_FileBuffer.toString();
    var Acc_File_Buffer_Split_Lines = Acc_File_Buffer_To_String.split("\n");
    
    var Steam_FileBuffer =  fs.readFileSync("./Steam.txt");
    var Steam_File_Buffer_To_String = Steam_FileBuffer.toString();
    var Steam_File_Buffer_Split_Lines = Steam_File_Buffer_To_String.split("\n");
    
    const all = Minecraft_File_Buffer_Split_Lines.length-1 + Origin_File_Buffer_Split_Lines.length-1 + Crunchyroll_File_Buffer_Split_Lines.length-1 + Nordvpn_File_Buffer_Split_Lines.length-1 + Disney_File_Buffer_Split_Lines.length-1 + Hulu_File_Buffer_Split_Lines.length-1 + Robloxg_File_Buffer_Split_Lines.length-1 + Steam_File_Buffer_Split_Lines.length-1 + Acc_File_Buffer_Split_Lines.length-1
    
    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#0008ff')
    .setTitle('Generators: ')
    .setThumbnail("https://cdn.glitch.com/2a0a3e33-f2b8-43ce-9c36-2ffd8bd97c3a%2Fglitchy_brick.jpg?v=1589198677464")
    .addField('Minecraft', Minecraft_File_Buffer_Split_Lines.length-1, true)
    .addField('Origin', Origin_File_Buffer_Split_Lines.length-1, true)
    .addField('Crunchyroll ', Crunchyroll_File_Buffer_Split_Lines.length-1, true)
    .addField('NordVPN', Nordvpn_File_Buffer_Split_Lines.length-1, true)
    .addField('Disney Plus', Disney_File_Buffer_Split_Lines.length-1, true)
    .addField('Hulu', Hulu_File_Buffer_Split_Lines.length-1, true)
    .addField('Roblox Groups', Robloxg_File_Buffer_Split_Lines.length-1, true)
    .addField('Steam', Steam_File_Buffer_Split_Lines.length-1, true)
    .addField('Account Lists', Acc_File_Buffer_Split_Lines.length-1, true)
    .setFooter(all + " Total Accounts in Stock")
    
    message.say(exampleEmbed)
  }
};
