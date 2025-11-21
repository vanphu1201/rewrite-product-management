const User = require("../../model/user.model");

const socket = require("../../socket/client/users.socket");

// [GET] /users/not-friend
module.exports.notFriend = async (req, res) => {
    // Socket
    socket(req, res);
    // End Socket



    const userId = res.locals.user.id;
    const myUser = await User.findOne({_id: userId});
    const acceptFriends = myUser.acceptFriends;
    const requestFriends = myUser.requestFriends;

    
    const users = await User.find({
        $and: [
            {_id: {$ne: userId}},
            {_id: {$nin: requestFriends}},
            {_id: {$nin: acceptFriends}}
        ]
    }).select("avatar fullName");

    
    res.render("client/pages/users/not-friend", {
        title: "Danh sách người dùng",
        users: users
    })
}



// [GET] /users/request
module.exports.request = async (req, res) => {
    // Socket
    socket(req, res);
    // End Socket

    const userId = res.locals.user.id;
    const myUser = await User.findOne({_id: userId});  
    const requestFriends = myUser.requestFriends;

    const users = await User.find({
        _id: {$in: requestFriends}
    })
 

    res.render("client/pages/users/request", {
        title: "Lời mòi đã gửi",
        users: users
    })
}



// [GET] /users/accept
module.exports.accept = async (req, res) => {
    // Socket
    socket(req, res);
    // End Socket

    const userId = res.locals.user.id;
    const myUser = await User.findOne({_id: userId});  
    const acceptFriends = myUser.acceptFriends;

    const users = await User.find({
        _id: {$in: acceptFriends}
    })
 

    res.render("client/pages/users/accept", {
        title: "Lời mòi kết bạn",
        users: users
    })
}