const emoji = require("../../configs/emoji.json")
const ayar = require("../../configs/guild.json")
const Discord = require("discord.js")
const isimler = require("../../schemas/names");
const regstats = require("../../schemas/registerStats");
const coin = require("../../schemas/coin");
const settings = require("../../configs/roles.json");
const settingst = require("../../configs/channels.json");
const coinçek = require("../../configs/coin.json");
const toplams = require("../../schemas/toplams");
const kayitg = require("../../schemas/kayitgorev");
module.exports = {
	conf: {
		aliases: ["kayıt"],
		name: "kayıt",
		help: "kayıt",
		enabled: true
	},

  
run: async (client, message, args, embed, prefix) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send("Lütfen bir üye etiketleyin veya ID giriniz! Örn:@Adoncia/ID")
    const nick = args.slice(1).filter(arg => isNaN(arg)).map(arg => arg[0].toUpperCase() + arg.slice(1).toLowerCase()).join(" ");
    if (!nick) return message.channel.send("Lütfen Yeni ismi belirtin");
    const age = args.slice(1).filter(arg => !isNaN(arg))[0] ?? undefined;
    if (!age || isNaN(age)) return message.channel.send("Geçerli bir yaş belirtin.");
    if (message.guild.members.cache.has(member.id) && message.member.roles.highest.position <= message.guild.members.cache.get(member.id).roles.highest.position) return message.channel.send("Kendi rolünden yüksek kişilere işlem uygulayamazsın!")
    if(nick.length > 30) return message.channel.send("İsim Hatası (32 Karakter) İsim karakteri fazla olduğundan dolayı işlem yapılamadı.")
    if (age < 14) return message.channel.send("Yaş Sınırı (14) Belirtilen üyenin yaşı, yaş sınırının altında olduğu için kayıt işlemi yapılamadı.");
    if (age > 99) return message.channel.send("Kayıt ettiğin üyenin yaşı iki basamakdan büyük olamaz");
    if (!member.manageable) return message.channel.send("Yetki Üstünlüğü İşlem yapmaya çalıştığın üye senle aynı yetkide veya senden üstün!")
    let setName;
    { setName = `${member.user.username.includes(ayar.tag) ? ayar.tag : (ayar.tagseconds ? ayar.tagseconds : (ayar.tag || ""))} ${nick} l ${age}`;
    }
     
    member.setNickname(`${setName}`)
let namesembed = new Discord.MessageEmbed ()
.setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true }) })
.setThumbnail(message.author.avatarURL({ dynamic: true }))
.setDescription(`${member} Kullancısı Başarıyla **${setName}** Olarak Kayıt Edildi Aşağıdaki Butonlara Basarak Cinsiyeti Belirtiniz`)

const adocomp = new Discord.MessageActionRow()
.addComponents(
    new Discord.MessageButton()
        .setCustomId('erkek')
        .setLabel("Erkek")
        .setStyle('PRIMARY'))
.addComponents(
    new Discord.MessageButton()
        .setCustomId('kız')
        .setLabel("Kız")
        .setStyle('SUCCESS'))
.addComponents(
    new Discord.MessageButton()
        .setCustomId('iptal')
        .setLabel("İptal")
        .setStyle('DANGER'))
        
var msg = await message.channel.send({ embeds: [namesembed], components: [adocomp]})
var filter = (button) => button.user.id === message.author.id;
const collector = msg.createMessageComponentCollector({ filter, time: 300000 })
collector.on("collect", async (button) => {
if(button.customId === "erkek") {
const settings = require("../../configs/roles.json");
await member.roles.remove(settings.womanrole)
await member.roles.remove(settings.unregisterrole)
await member.roles.add(settings.manrole)
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: message.author.id }, { $inc: { coin: coinçek.toplamsCoin } }, { upsert: true });
await toplams.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { toplams: member.user.id } }, { upsert: true });
await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, erkek: 1, erkek24: 1, erkek7: 1, erkek14: 1, }, }, { upsert: true });
await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { names: { name: member.displayName, yetkili: message.author.id, rol: settings.manrole.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });
const kayitgData = await kayitg.findOne({ guildID: message.guild.id, userID: message.author.id });
if (kayitgData)
{
await kayitg.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { kayit: 1 } }, { upsert: true });
}
client.channels.cache.get(settingst.generalchat).send(`${member} aramıza katıldı! tekrardan aramıza hoşgeldin umarım iyi vakit geçirirsin.`)
message.react(emoji.onay)
adocomp.components[0].setDisabled(true) 
adocomp.components[1].setDisabled(true) 
adocomp.components[2].setDisabled(true)
msg.edit({ components: [adocomp] });
let erkekEmbed = new Discord.MessageEmbed()
.setAuthor({ name: member.user.tag, iconURL: member.user.avatarURL({ dynamic: true })})
.setDescription(`${member} üyesine ${settings.manrole.map(x => `<@&${x}>`)} rolleri verildi ve ismi \`${setName}\` olarak düzenlendi.`)
.setColor('RANDOM')
.setFooter({text:`${message.author.tag} tarafından kayıt edildi`,iconURL:message.author.displayAvatarURL({ dynamic: true })})
button.reply({ embeds: [erkekEmbed] })
}
if(button.customId === "kız") {
 
    await member.roles.add(settings.womanrole)
    await member.roles.remove(settings.unregisterrole)
    await member.roles.remove(settings.manrole)

client.channels.cache.get(settingst.generalchat).send(`${member} aramıza katıldı! tekrardan aramıza hoşgeldin umarım iyi vakit geçirirsin.`).then(x => x.delete({timeout: 15000}))
message.react(emoji.onay)
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: message.author.id }, { $inc: { coin: coinçek.toplamsCoin } }, { upsert: true });
await toplams.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { toplams: member.user.id } }, { upsert: true });
await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, kız: 1, kız24: 1, kız7: 1, kız14: 1, }, }, { upsert: true });
await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { names: { name: member.displayName, yetkili: message.author.id,  rol: settings.womanrole.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });
const kayitgData = await kayitg.findOne({ guildID: message.guild.id, userID: message.author.id });
if (kayitgData)
{
await kayitg.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { kayit: 1 } }, { upsert: true });
}
adocomp.components[0].setDisabled(true) 
adocomp.components[1].setDisabled(true) 
adocomp.components[2].setDisabled(true) 
msg.edit({ components: [adocomp] });
let kadınEmbed = new Discord.MessageEmbed()
.setAuthor({ name: member.user.tag, iconURL: member.user.avatarURL({ dynamic: true })})
.setDescription(`${member} üyesine ${settings.womanrole.map(x => `<@&${x}>`)}  rolleri verildi ve ismi \`${setName}\` olarak düzenlendi.`)
.setColor('RANDOM')
.setFooter({text:`${message.author.tag} tarafından kayıt edildi`,iconURL: message.author.displayAvatarURL({ dynamic: true })}) 
button.reply({ embeds: [kadınEmbed] })
            
               








            }
}
)}
}