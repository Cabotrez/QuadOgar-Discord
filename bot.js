const config = require(`./json/config.json`);
const Discord = require(`discord.js`);
const fs = require(`fs`);
const figlet = require(`figlet`);
const bot = new Discord.Client({disableEveryone: true});
const prefix = config.prefix;

bot.commands = new Discord.Collection();

fs.readdir(`./cmds/`, (err, files) => {
	if (err) console.error(err);

	let jsfiles = files.filter(f => f.split(`.`).pop() === `js`);
	if (jsfiles.length <= 0) return console.log(`No commands were found.`);

	console.log(`\x1b[35m`, `Loading ${jsfiles.length} commands\n`);
	jsfiles.forEach((f, i) => {
		f.slice(0, -3)
		let props = require(`./cmds/${f}`);
		console.log(`\x1b[32m`, `Loaded command: ${f.substring(0, f.length - 3)}`);
		bot.commands.set(props.help.name, props);
	});
});

bot.on(`ready`, async() => {
	bot.user.setActivity(`i like skins`);
	figlet(`${config.name} - ${config.version}\n`, function(err, data) {
			if (err) {
					console.log(`\x1b[31m`, `Something went wrong...`);
					console.dir(err);
					return;
			}
	console.log(`\x1b[34m%s`, data);
	});
});

bot.on(`message`, async message => {
	let messageArray = message.content.split(/\s+/g);
	let command = messageArray[0];
	let args = message.content.split(' ').slice(1);
	let cmd = bot.commands.get(command.slice(prefix.length));
	if (message.author.bot) return;
	if (message.channel.id == "648270515424722965") message.delete();
	if (!command.startsWith(prefix)) return;
	if (cmd) cmd.run(bot, message, args);
});

bot.login(process.env.token || config.token);
