var Discord = require(`discord.js`);
let config = require("../json/config.json")

module.exports.run = async (bot, message, args) => {

  if (message.author.bot) return;
  if (message.guild.id != "647909290061070366") return;
  if (!message.member.hasPermission('ADMINISTRATOR', false, false)) return;

  try {
    function log(name, id) {
      let sendoverembed = new Discord.RichEmbed()
          .setTitle(`Skin approved`)
          .setColor(`#00ff00`)
          .setDescription(`<@${id}>: your skin, called \`${name}\`, has been approved and is now available to use in-game. You may resubmit your skin again.`)
          .setFooter(`Approved by ${message.member.user.tag}`, message.author.avatarURL)
          .setTimestamp();
        bot.channels.get(`648270871538040844`).send(sendoverembed)
    }

    log(args[0], args[1]);
    message.guild.members.get(args[1]).removeRole(`648281545752182797`);
    }

  catch(e) {
    return message.channel.send(`We ran into an error executing the \`approve\` command. Please read the console's reason below to fix the issue. If this is nothing that you can fix, contact the dev at the Discord. \n\`\`\`js\n${e}\`\`\``)
  }
}

module.exports.help = {
  name: `approve`
}
