import mongoose, { Document, Schema } from 'mongoose';

export type TLogLevel = 'info' | 'debug' | 'warning' | 'error' | 'trace';

interface IMessage extends Document {
    level: TLogLevel;
    message: string;
    time: number;
}

const Message: Schema = new Schema<IMessage>({
    level: {type: String, required: true},
    message: {type: String, required: true},
    time: {type: Number, required: true}
});

export default mongoose.model<IMessage>('Message', Message);
