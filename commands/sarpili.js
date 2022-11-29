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
        const connection = getVoiceConnection(guild);

        let assault = cache.get('assault');
        let paused = cache.get('paused');
        let number = cache.get('switch');
    
        //checks if the bot is in a channel
        if (connection == null) {

            return interaction.reply({
                content: `❌ Bot is not in a voice channel`
            })
        }


        //resets the tracks after each use as it cannot reuse a finished track
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

              // doesn't work bcs of the number++ (number == 5) ? cache.set('switch', 1) : cache.set('switch', number++);

                if (number == 5) {
                    cache.set('switch', 1);
                } else {
                    number++;
                    cache.set('switch', number);
                }

                //plays the newly selected music
                music(number);

                return interaction.reply({
                    content: `✅ Switched to sound number ${number}`
                })

            case 'play':

                if (paused == false) {

                    //directly plays the music if the bot isn't paused
                    music(number);
                    
                } else {

                    //unpauses the bot and resets the variable
                    connection.state.subscription.player.unpause();

                    cache.set('paused', false);

                }

                    return interaction.reply({
                        content: `✅ Playing sound number ${number}`
                    })

            case 'pause':

                //pauses the music and sets the paused var
                cache.set('paused', true);

                //in case we stopped the loop with pause
                cache.set('assault', false);

                connection.state.subscription.player.pause();

                return interaction.reply({
                    content: `❌ Paused`
                })

            case 'quit':

                //deconnects the bot
                connection.destroy();  
                
                return interaction.reply({
                    content: `❌ Connection Destroyed`
                })
                
            case 'assault':

                //loops the music infinitely    
                //stops if assault == true bcs it means the command was recalled

               if (assault == true) {

                    connection.state.subscription.player.pause();

                    cache.set('assault', false);

                    return interaction.reply({
                        content: `❌ Assault Stopped`
                    })

               }    else {

                interaction.reply({
                    content: `✅ Assault Started`
                })

                //resets the var
                cache.set('assault', true);
                
                //initiates the music
                music(number);

                //replays the music each time the last track finishes playing and the bot becomes idle
                connection.state.subscription.player.on(AudioPlayerStatus.Idle, () => {

                    music(number);

                })
               }        

                break;
      
        } 
    }
};