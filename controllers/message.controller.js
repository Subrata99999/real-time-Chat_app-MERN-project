import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";


export const getUserForSideber = async(req, res)  => {
    try {
        const LoggedInUserId = req.user._id;
        const filteredUser = await User.find({_id: {$ne:LoggedInUserId}}).select("-password");
        res.status(200).json(filteredUser)
    } catch (error) {
        console.error("Error in getUserForSidebar:", error.message );
        res.status(500).json({error: "Internal server error"});
    
    }
};

 export const getMessages = async(req,res) => {
    try {
        const {id:userToChatId} = req.params
        const myId = req.user._id;

        const message = await Message.find({
            $or:[
                {senderId:myId, reciverId:userToChatId},
                {senderId:userToChatId, reciverId:myId}
            ]
        })

        res.status(200).json(messages)
        
    } catch (error) {
        console.log("error in getMessages controller", error.message);
        res.status(500).json ({message: "Internal server error"});
        
    }
 };

 export const sendMessage = async(req,res) => {
    try {
        const {text, image} = req.body;
        const {id: reciverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // todo: realtime functionality goes here =>  socket.io

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("error in sendMessage  controller:", error.message);
        res.status(500).jsoon({error:"Internal server error"});
        
    }

 }