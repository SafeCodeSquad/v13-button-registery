const isimler = require("../../schemas/names");
const data = require("../../schemas/names");
const Discord = require("discord.js")
const ayar = require("../../configs/guild.json")
const { red } = require("../../configs/emoji.json")
module.exports = {
	conf: {
		aliases: ["isim"],
		name: "isim",
		help: "isim",
		enabled: true
	},

  
run: async (client, message, args, embed, prefix) => {
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send("Lütfen bir üye etiketleyin veya ID giriniz! Örn:@Adoncia/ID")
const nick = args.slice(1).filter(arg => isNaN(arg)).map(arg => arg[0].toUpperCase() + arg.slice(1).toLowerCase()).join(" ");
if (!nick) return message.channel.send("Yeni ismi belirtin.");
const age = args.slice(1).filter(arg => !isNaN(arg))[0] ?? undefined;
if (!age || isNaN(age)) return message.channel.send("Geçerli bir yaş belirtin.");
if (message.guild.members.cache.has(member.id) && message.member.roles.highest.position <= message.guild.members.cache.get(member.id).roles.highest.position) return message.channel.send("Kendi rolünden yüksek kişilere işlem uygulayamazsın!")
if(nick.length > 30) return message.channel.send(message, "isim ya da yaş ile birlikte toplam 30 karakteri geçecek bir isim giremezsin.")
if (age < 14) return message.channel.send(`Kayıt ettiğin üyenin yaşı 14 den küçük olamaz.`);
if (age > 99) return message.channel.send(`Kayıt ettiğin üyenin yaşı iki basamakdan büyük olamaz.`);
if (!member.manageable) return message.channel.send(`Kullanıcı benden yüksek bir pozisyona sahip o yüzden ismini değiştiremiyorum.`)
let setName;
{ setName = `${member.user.username.includes(ayar.tag) ? ayar.tag : (ayar.tagseconds ? ayar.tagseconds : (ayar.tag || ""))} ${nick} l ${age}`;
}
 
member.setNickname(`${setName}`)
await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { names: { name: setName, yetkili: message.author.id,  rol: "İsim Değiştirme", date: Date.now() } } }, { upsert: true });
let namesembed = new Discord.MessageEmbed ()
.setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true }) })
.setDescription(`${member} üyesinin ismi ${message.author} Yetkilisi Tarafından **${setName}** olarak değiştirildi.
${red} üyesinin toplamda **${data ? `${data.names.length}` : "0"}** isim kayıtı bulundu
`)
message.channel.send({embeds: [namesembed]})
}   }



   
