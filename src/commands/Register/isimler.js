const nameData = require("../../schemas/names")
const Discord = require("discord.js")
const moment = require("moment")
moment.locale("tr")
module.exports = {
	conf: {
		aliases: ["isimler"],
		name: "isimler",
		help: "isimler",
		enabled: true
	},

  
run: async (client, message, args, embed, prefix) => {


const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
if(!member) return message.channel.send("ütfen bir üye etiketleyin veya ID giriniz! Örn:@Adoncia/ID")
const data = await nameData.findOne({ guildID: message.guild.id, userID: member.user.id });
embed.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }));
    embed.setTitle(`${member.user.username} üyesinin toplamda ${data.names.length} tane isim kayıtı bulundu ;`);
    message.channel.send({ embeds: [embed.setDescription(data ? data.names.splice(0, 10).map((x, i) => `\`${i + 1}.\`  \`${x.name}\` \n Rolleri:(${x.rol}) \n Yetkili:<@${x.yetkili}> \n Tarih:**\`${moment(x.date).format("LLL")}\`**`).join("\n") : "Bu kullanıcıya ait isim geçmişi bulunmuyor!")]});
  }
};


