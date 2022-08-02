"use strict";
const discord_js_1 = require("discord.js");
const events_1 = require("events");
const handlers_1 = require("./handlers");
class TempChannelsManager extends events_1.EventEmitter {
    client;
    channels;
    constructor(client) {
        super();
        if (!new discord_js_1.IntentsBitField(client.options.intents).has('GuildVoiceStates')) {
            throw new Error('GUILD_VOICE_STATES intent is required to use this package!');
        }
        this.channels = [];
        this.client = client;
        this.client.on("voiceStateUpdate", async (oldState, newState) => {
            (0, handlers_1.handleVoiceStateUpdate)(this, oldState, newState);
        });
        this.client.on("channelDelete", channel => {
            (0, handlers_1.handleChannelDelete)(this, channel);
        });
    }
    registerChannel(channelID, options = {
        childCategory: null,
        childAutoDeleteIfEmpty: true,
        childAutoDeleteIfOwnerLeaves: true,
        childFormat: (member, count) => `#${count} | ${member}'s lounge`,
        childMaxUsers: null
    }) {
        const channelData = {
            channelID,
            options,
            children: []
        };
        this.channels.push(channelData);
        this.emit("channelRegister", channelData);
    }
    unregisterChannel(channelID) {
        const channel = this.channels.find(channelData => channelData.channelID === channelID);
        this.channels = this.channels.filter(channelData => channelData.channelID !== channelID);
        return this.emit("channelUnregister", channel);
    }
}
module.exports = TempChannelsManager;
