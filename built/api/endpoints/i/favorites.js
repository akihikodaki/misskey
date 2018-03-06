"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies
 */
const cafy_1 = require("cafy");
const favorite_1 = require("../../models/favorite");
const post_1 = require("../../models/post");
/**
 * Get followers of a user
 *
 * @param {any} params
 * @param {any} user
 * @return {Promise<any>}
 */
module.exports = (params, user) => new Promise(async (res, rej) => {
    // Get 'limit' parameter
    const [limit = 10, limitErr] = cafy_1.default(params.limit).optional.number().range(1, 100).$;
    if (limitErr)
        return rej('invalid limit param');
    // Get 'offset' parameter
    const [offset = 0, offsetErr] = cafy_1.default(params.offset).optional.number().min(0).$;
    if (offsetErr)
        return rej('invalid offset param');
    // Get 'sort' parameter
    const [sort = 'desc', sortError] = cafy_1.default(params.sort).optional.string().or('desc asc').$;
    if (sortError)
        return rej('invalid sort param');
    // Get favorites
    const favorites = await favorite_1.default
        .find({
        user_id: user._id
    }, {
        limit: limit,
        skip: offset,
        sort: {
            _id: sort == 'asc' ? 1 : -1
        }
    });
    // Serialize
    res(await Promise.all(favorites.map(async (favorite) => await post_1.pack(favorite.post))));
});
