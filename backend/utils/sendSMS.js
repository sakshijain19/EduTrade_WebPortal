import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const sendSMS = async (phoneNumber, message) => {
    try {
        const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
            headers: {
                Authorization: process.env.FAST2SMS_API_KEY
            },
            params: {
                route: 'v3',
                sender_id: 'TXTIND',
                message: message,
                language: 'english',
                flash: 0,
                numbers: phoneNumber
            }
        });
        return response.data;
    } catch (error) {
        console.error("SMS error:", error.message);
        throw new Error("Failed to send SMS");
    }
};

export default sendSMS;
