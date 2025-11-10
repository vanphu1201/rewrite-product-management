const Chat = require("../../model/chat.model");
const User = require("../../model/user.model");

// [GET] /chat
module.exports.index = async (req, res) => {

    _io.once('connection', (socket) => {
        // CLIENT_SEND MESSAGE
        socket.on("CLIENT_SEND MESSAGE", async (data) => {
            const chat = new Chat({
                user_id: res.locals.user.id,
                content: data
            });
            await chat.save();

            // SEVER_RETURN_DATA
            _io.emit("SEVER_RETURN_DATA", {
                user_id: res.locals.user.id,
                fullName: res.locals.user.fullName,
                content: data
            });
            // END SEVER_RETURN_DATA
        });
        // END CLIENT_SEND MESSAGE
    });

    const chats = await Chat.find({deleted: false});

    for (const chat of chats) {
        const infoUser = await User.findOne({_id: chat.user_id}).select("fullName avatar");
        chat.infoUser = infoUser
    }


    res.render("client/pages/chat/index", {
        title: "Chat",
        chats: chats
    })
}