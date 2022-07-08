const Discord = require("discord.js")
const settings = require("../../configs/roles.json");
module.exports = {
	conf: {
		aliases: ["kayıtsız"],
		name: "kayıtsız",
		help: "kayıtsız",
		enabled: true
	},

  
    run: async (client, message, args, embed, prefix) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send("Kayıtsıza atmak istediğiniz kişiye belirtmeniz gerekmektedir.")
    member.roles.set(settings.unregisterrole)
    member.voice.disconnect()
    member.setNickname(`İsim l Yaş`)
    const görüşürüz = new Discord.MessageEmbed()
        .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
        .setDescription(`${member} adlı kullanıcı sunucumuzda başarıyla kayıtsıza atılmıştır.`)
        .setColor(message.member.displayHexColor)
        message.channel.send({ embeds: [görüşürüz] })
    }}