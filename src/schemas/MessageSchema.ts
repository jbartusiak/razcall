import mongoose, { Schema } from 'mongoose';
import { Document } from 'mongoose';

export type TLogLevel = 'info' | 'debug' | 'warning' | 'error' | 'trace';

export interface Message extends Document {
    level: TLogLevel;
    message: string;
    time: number;
}

const MessageSchema: Schema = new Schema<Message>({
    level: {type: String, required: true},
    message: {type: String, required: true},
    time: {type: Number, required: true}
});

export default mongoose.model('Message', MessageSchema);
