"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies
 */
const cafy_1 = require("cafy");
const channel_1 = require("../../models/channel");
const channel_watching_1 = require("../../models/channel-watching");
/**
 * Unwatch a channel
 *
 * @param {any} params
 * @param {any} user
 * @return {Promise<any>}
 */
module.exports = (params, user) => new Promise(async (res, rej) => {
    // Get 'channel_id' parameter
    const [channelId, channelIdErr] = cafy_1.default(params.channel_id).id().$;
    if (channelIdErr)
        return rej('invalid channel_id param');
    //#region Fetch channel
    const channel = await channel_1.default.findOne({
        _id: channelId
    });
    if (channel === null) {
        return rej('channel not found');
    }
    //#endregion
    //#region Check whether not watching
    const exist = await channel_watching_1.default.findOne({
        user_id: user._id,
        channel_id: channel._id,
        deleted_at: { $exists: false }
    });
    if (exist === null) {
        return rej('already not watching');
    }
    //#endregion
    // Delete watching
    await channel_watching_1.default.update({
        _id: exist._id
    }, {
        $set: {
            deleted_at: new Date()
        }
    });
    // Send response
    res();
    // Decrement watching count
    channel_1.default.update(channel._id, {
        $inc: {
            watching_count: -1
        }
    });
});
