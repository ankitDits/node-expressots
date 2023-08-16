import * as mongoose from 'mongoose';
import ENV from 'env';
import { LogLevel, log } from '@expressots/core';
const connection = async () => {
    await mongoose.connect(ENV.Database.ConnectionURI)
        .then(() => {
            log(LogLevel.Info, "Connected to mongodb", "connection.ts");
        }).catch((err) => {
            log(LogLevel.Error, err);
        })

};

export default connection