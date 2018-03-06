"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = require("../../api/models/post");
const user_1 = require("../../api/models/user");
async function predictOne(id) {
    console.log(`predict interest of ${id} ...`);
    // TODO: repostなども含める
    const recentPosts = await post_1.default.find({
        user_id: id,
        category: {
            $exists: true
        }
    }, {
        sort: {
            _id: -1
        },
        limit: 1000,
        fields: {
            _id: false,
            category: true
        }
    });
    const categories = {};
    recentPosts.forEach(post => {
        if (categories[post.category]) {
            categories[post.category]++;
        }
        else {
            categories[post.category] = 1;
        }
    });
}
exports.predictOne = predictOne;
async function predictAll() {
    const allUsers = await user_1.default.find({}, {
        fields: {
            _id: true
        }
    });
    allUsers.forEach(user => {
        predictOne(user._id);
    });
}
exports.predictAll = predictAll;
