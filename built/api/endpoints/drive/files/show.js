"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies
 */
const cafy_1 = require("cafy");
const drive_file_1 = require("../../../models/drive-file");
/**
 * Show a file
 *
 * @param {any} params
 * @param {any} user
 * @return {Promise<any>}
 */
module.exports = async (params, user) => {
    // Get 'file_id' parameter
    const [fileId, fileIdErr] = cafy_1.default(params.file_id).id().$;
    if (fileIdErr)
        throw 'invalid file_id param';
    // Fetch file
    const file = await drive_file_1.default
        .findOne({
        _id: fileId,
        'metadata.user_id': user._id
    });
    if (file === null) {
        throw 'file-not-found';
    }
    // Serialize
    const _file = await drive_file_1.pack(file, {
        detail: true
    });
    return _file;
};
