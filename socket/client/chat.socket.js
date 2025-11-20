const Chat = require("../../model/chat.model");

const uploadToCloudinary = require("../../helpers/uploadToCloudinary");

module.exports = (res) => {
    const fullName = res.locals.user.fullName;
    const id = res.locals.user.id;

    _io.once('connection', (socket) => {
        // CLIENT_SEND MESSAGE
        socket.on("CLIENT_SEND MESSAGE", async (data) => {
            let images = [];
            for (const buffer of data.images) {
                const link = await uploadToCloudinary(buffer);
                images.push(link);
            }
            const chat = new Chat({
                user_id: id,
                content: data.content,
                images: images
            });
            await chat.save();

            // SEVER_RETURN_DATA
            _io.emit("SEVER_RETURN_DATA", {
                user_id: id,
                fullName: fullName,
                content: data.content,
                images: images
            });
            // END SEVER_RETURN_DATA
        });
        // END CLIENT_SEND MESSAGE

        // CLIENT_SEND_TYPING
        socket.on("CLIENT_SEND_TYPING", (statusTyping) => {
            socket.broadcast.emit("SERVE_RETURN_TYPING", {
                fullName: fullName,
                userId: id,
                type: statusTyping
            });
        })
        // END CLIENT_SEND_TYPING

    });
}