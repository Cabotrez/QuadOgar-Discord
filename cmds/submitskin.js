var Discord = require(`discord.js`);
let config = require("../json/config.json")

module.exports.run = async (bot, message, args) => {

  if (message.author.bot) return;
  if (message.guild.id != "647909290061070366") return;

  try {
    function sendOver(name, url, channel, title) {
      let sendoverembed = new Discord.RichEmbed()
          .setTitle(title)
          .setColor(message.member.displayHexColor)
          .setThumbnail(url || config.image)
          .addField(`Submitted by`, `${message.member.user.tag} (${message.author.id})`)
          .addField(`Skin name`, name)
          .addField(`Skin URL`, url)
          .setFooter(message.member.user.tag, message.author.avatarURL)
          .setTimestamp();
        bot.channels.get(channel).send(sendoverembed)
    }

    function success(name, url) {
      let successembed = new Discord.RichEmbed()
          .setTitle(`Submit skin command`)
          .setColor(`#00ff00`)
          .setThumbnail(url || config.image)
          .addField(`Success`, `Your skin has been added to the queue under the name \`${name}\`.`)
          .setFooter(message.member.user.tag, message.author.avatarURL)
          .setTimestamp();
          sendOver(name, url, `648289847215390788`, `Skin submission`)
          sendOver(name, url, `648270871538040844`, `Skin approval`)
        return message.channel.send(successembed)
        .then(msg => {
          msg.delete(7500)
        });
    }

    function failed(reason) {
      let failedembed = new Discord.RichEmbed()
          .setTitle(`Submit skin command`)
          .setColor(`#00ff00`)
          .setThumbnail(config.image)
          .addField(`Failed`, reason)
          .setFooter(message.member.user.tag, message.author.avatarURL)
          .setTimestamp();
        return message.channel.send(failedembed)
        .then(msg => {
          msg.delete(7500)
        });
    }

    if (message.channel.id == "648270515424722965") {
      if (!args[0] || !args[1]) return failed(`Please enter a value for the name and skin url!`);
      if (args[0].length < 3) return failed(`Your skin name is less than 3 characters long!`);
      if (!args[1].match(/i.imgur/g)) return failed(`Your skin URL is not from imgur!`)
      if (!args[1].match(/.png/g)) return failed(`Your skin URL is not detected to be a .PNG!`)
    }

    message.member.addRole(`648281545752182797`);

    success(args[0], args[1]);
    }

  catch(e) {
    return message.channel.send(`We ran into an error executing the \`submit skin\` command. Please read the console's reason below to fix the issue. If this is nothing that you can fix, contact the dev at the Discord. \n\`\`\`js\n${e}\`\`\``)
  }
}

module.exports.help = {
  name: `submit`
}
