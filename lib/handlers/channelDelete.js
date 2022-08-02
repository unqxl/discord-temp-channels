"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChannelDelete = void 0;
const handleChannelDelete = (manager, channel) => {
    // Check if the channel is a parent or a child
    const parentChannel = manager.channels.find(channelData => channelData.channelID === channel.id);
    if (parentChannel) {
        // Remove the parent channel
        manager.channels = manager.channels.filter(channelData => channelData.channelID !== channel.id);
        return manager.emit("channelUnregister", parentChannel);
    }
    const parentChildChannel = manager.channels.find(channelData => channelData.children.some(child => child.channel.id === channel.id));
    if (parentChildChannel) {
        // Remove the child from children
        parentChildChannel.children = parentChildChannel.children.filter(child => child.channel.id !== channel.id);
    }
};
exports.handleChannelDelete = handleChannelDelete;
