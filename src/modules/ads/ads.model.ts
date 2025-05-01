import { Schema, model } from 'mongoose';
import { IAd, Category } from '@/modules/ads/ads.types';

const AdSchema = new Schema<IAd>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, enum: Category, required: true },
        createdBy: { type: Schema.Types.ObjectId, ref: 'Users' },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (_, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
        toObject: { virtuals: true },
    },
);

export const AdModel = model<IAd>('Ad', AdSchema);
