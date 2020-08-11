import mongoose, { Document, Schema } from 'mongoose';

export type TLogLevel = 'info' | 'debug' | 'warn' | 'error' | 'trace';

export interface ILogMessage extends Document {
    level: TLogLevel;
    message: string;
    time: number;
}

const Logs: Schema = new Schema<ILogMessage>({
    level: {type: String, required: true},
    message: {type: String, required: true},
    time: {type: Number, required: true}
});

export default mongoose.model<ILogMessage>('Logs', Logs);
