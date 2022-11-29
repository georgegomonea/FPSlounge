const {
    SlashCommandBuilder,
} = require('@discordjs/builders');

const { 
    joinVoiceChannel,
    createAudioPlayer,
    NoSubscriberBehavior,
} = require('@discordjs/voice');

module.exports = {

    name: "join",
    timeout: 5,
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('joinx'),

    async execute (client, interaction, cache) {

        const member = interaction.member;
        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play,
            },
        });

        if (member.voice.channel) {

            //initiates the variables for each reconnection
            cache.set('assault', false);
            cache.set('paused', false);
            cache.set('switch', 1);


            //connects the bot to the member's curent cahnnel
            const channel = interaction.member.voice.channel;   

            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            }); 

            //subscribes the connection to the music player
            connection.subscribe(player);

            return interaction.reply({
                content: `✅ Ready to play Boss`
            })

        } else {

            return interaction.reply({
                content: `❌ Member not in a voice channel`
            })
        }
    }
};