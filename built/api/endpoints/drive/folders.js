"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies
 */
const cafy_1 = require("cafy");
const drive_folder_1 = require("../../models/drive-folder");
/**
 * Get drive folders
 *
 * @param {any} params
 * @param {any} user
 * @param {any} app
 * @return {Promise<any>}
 */
module.exports = (params, user, app) => new Promise(async (res, rej) => {
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
    // Get 'folder_id' parameter
    const [folderId = null, folderIdErr] = cafy_1.default(params.folder_id).optional.nullable.id().$;
    if (folderIdErr)
        return rej('invalid folder_id param');
    // Construct query
    const sort = {
        _id: -1
    };
    const query = {
        user_id: user._id,
        parent_id: folderId
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
    const folders = await drive_folder_1.default
        .find(query, {
        limit: limit,
        sort: sort
    });
    // Serialize
    res(await Promise.all(folders.map(async (folder) => await drive_folder_1.pack(folder))));
});
