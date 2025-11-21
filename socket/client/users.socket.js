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




        // HỦY GỬI LỜI MỜI KẾT BẠN
        socket.on("CLIENT_CANCEL_FRIEND", async userId => {
            const myUserId = res.locals.user.id;
            
            // Xóa id của A trong acceptFriend của B
            const existAinB = await User.findOne({
                _id: userId,
                acceptFriends: myUserId
            });
            if (existAinB) {
                await User.updateOne({_id: userId}, {$pull: {acceptFriends: myUserId}});
            }
            // Hết Xóa id của A trong acceptFriend của B

            // Xóa id của B trong requestFriend của A
            const existBinA = await User.findOne({
                _id: myUserId,
                requestFriends: userId
            });
            if (existBinA) {
                await User.updateOne({_id: myUserId}, {$pull: {requestFriends: userId}});
            }
            // Hết Xóa id của B trong requestFriend của A

        })
        // HẾT HỦY GỬI LỜI MỜI KẾT BẠN



        // TỪ CHỐI LỜI MỜI KẾT BẠN
        socket.on("CLIENT_REFUSE_FRIEND", async userId => {
            const myUserId = res.locals.user.id;
            
            // Xóa id của B trong acceptFriend của A
            const existBinA = await User.findOne({
                _id: myUserId,
                acceptFriends: userId
            });
            if (existBinA) {
                await User.updateOne({_id: myUserId}, {$pull: {acceptFriends: userId}});
            }
            // Hết Xóa id của B trong acceptFriend của A

            // Xóa id của A vào requestFriend của B
            const existAinB = await User.findOne({
                _id: userId,
                requestFriends: myUserId
            });
            if (existAinB) {
                await User.updateOne({_id: userId}, {$push: {requestFriends: myUserId}});
            }
            // Hết Xóa id của A vào requestFriend của B

        })
        // HẾT TỪ CHỐI LỜI MỜI KẾT BẠN


    });
}