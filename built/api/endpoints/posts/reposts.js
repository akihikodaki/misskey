"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies
 */
const cafy_1 = require("cafy");
const post_1 = require("../../models/post");
/**
 * Show a reposts of a post
 *
 * @param {any} params
 * @param {any} user
 * @return {Promise<any>}
 */
module.exports = (params, user) => new Promise(async (res, rej) => {
    // Get 'post_id' parameter
    const [postId, postIdErr] = cafy_1.default(params.post_id).id().$;
    if (postIdErr)
        return rej('invalid post_id param');
    // Get 'limit' parameter
    const [limit = 10, limitErr] = cafy_1.default(params.limit).optional.number().range(1, 100).$;
    if (limitErr)
        return rej('invalid limit param');
    // Get 'since_id' parameter
    const [sinceId, sinceIdErr] = cafy_1.default(params.since_id).optional.id().$;
    if (sinceIdErr)
        return rej('invalid since_id param');
    // Get 'until_id' parameter
    const [untilId, untilIdErr] = cafy_1.default(params.until_id).optional.id().$;
    if (untilIdErr)
        return rej('invalid until_id param');
    // Check if both of since_id and until_id is specified
    if (sinceId && untilId) {
        return rej('cannot set since_id and until_id');
    }
    // Lookup post
    const post = await post_1.default.findOne({
        _id: postId
    });
    if (post === null) {
        return rej('post not found');
    }
    // Construct query
    const sort = {
        _id: -1
    };
    const query = {
        repost_id: post._id
    };
    if (sinceId) {
        sort._id = 1;
        query._id = {
            $gt: sinceId
        };
    }
    else if (untilId) {
        query._id = {
            $lt: untilId
        };
    }
    // Issue query
    const reposts = await post_1.default
        .find(query, {
        limit: limit,
        sort: sort
    });
    // Serialize
    res(await Promise.all(reposts.map(async (post) => await post_1.pack(post, user))));
});
