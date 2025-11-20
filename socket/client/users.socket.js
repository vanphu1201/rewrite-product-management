const User = require("../../model/user.model");

module.exports = (req, res) => {
    _io.on('connection', (socket) => {
        // GỬI LỜI MỜI KẾT BẠN
        socket.on("CLIENT_ADD_FRIEND", async userId => {
            const myUserId = res.locals.user.id;
            
            // Thêm id của A vào acceptFriend của B
            const existAinB = await User.findOne({
                _id: userId,
                acceptFriends: myUserId
            });
            if (!existAinB) {
                await User.updateOne({_id: userId}, {$push: {acceptFriends: myUserId}});
            }
            // Hết Thêm id của A vào acceptFriend của B

            // Thêm id của B vào requestFriend của A
            const existBinA = await User.findOne({
                _id: myUserId,
                requestFriends: userId
            });
            if (!existBinA) {
                await User.updateOne({_id: myUserId}, {$push: {requestFriends: userId}});
            }
            // Hết Thêm id của B vào requestFriend của A

        })
        // HẾT GỬI LỜI MỜI KẾT BẠN

    });
}