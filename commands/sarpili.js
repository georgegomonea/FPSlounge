const {
    SlashCommandBuilder,
} = require('@discordjs/builders');

const {  
    createAudioResource, 
    getVoiceConnection,
    AudioPlayerStatus,
} = require('@discordjs/voice');

module.exports = {

    name: "sarpili",
    timeout: 5,
    data: new SlashCommandBuilder()
        .setName('sarpili')
        .setDescription('Wake up Time')
        .addSubcommand(subcommand =>
            subcommand
                .setName('switch')
                .setDescription('join your chanel'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('play')
                .setDescription('play song'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('quit')
                .setDescription('leave'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('assault')
                .setDescription('sarpilii'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('pause')
                .setDescription('pause')),

    async execute(client, interaction, cache) {

        const guild = interaction.guild.id;
        const member = interaction.member; 
        const connection = getVoiceConnection(guild);

        let assault = cache.get('assault');
        let paused = cache.get('paused');
        let number = cache.get('switch');
    
        if (connection == null) {

            return interaction.reply({
                content: `❌ Bot not in a voice channel`
            })
        }

        function music (number) {

            let music1 = createAudioResource('./src/music/sarpili.mp3');
            let music2 = createAudioResource('./src/music/Vietnam.mp3');
            let music3 = createAudioResource('./src/music/lait.mp3');
            let music4 = createAudioResource('./src/music/Regina Tone.mp3');
            let music5 = createAudioResource('./src/music/Katyusha.mp3');

            connection.state.subscription.player.play(eval('music' + number));

        }

        switch (interaction.options.getSubcommand()) {

            case 'switch':

              // (number == 5) ? cache.set('switch', 1) : cache.set('switch', number++);

                if (number == 5) {
                    cache.set('switch', 1);
                } else {
                    number++;
                    cache.set('switch', number);
                }

                return interaction.reply({
                    content: `✅ Playing sound number ${number}`
                })

            case 'play':

                if (paused == false) {

                    music(number);
                    
                } else {

                    connection.state.subscription.player.unpause();

                    cache.set('paused', false);

                }

                    return interaction.reply({
                        content: `✅ Playing`
                    })

            case 'pause':

                cache.set('paused', true);

                connection.state.subscription.player.pause();

                return interaction.reply({
                    content: `❌ Paused`
                })

            case 'quit':

                connection.destroy();  
                
                return interaction.reply({
                    content: `❌ Connection Destroyed`
                })
                
            case 'assault':

               if (assault == true) {

                    cache.set('assault', false);

                    return interaction.reply({
                        content: `❌ Assault Stopped`
                    })

               }    else {
                
                music(number);

                connection.state.subscription.player.on(AudioPlayerStatus.Idle, () => {

                    music(number);

                })
               }        

                break;
      
        } 
    }
};