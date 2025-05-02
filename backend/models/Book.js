import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, 'Description must be at least 10 characters long']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    condition: {
        type: String,
        required: [true, 'Condition is required'],
        enum: {
            values: ['New', 'Like New', 'Good', 'Fair', 'Poor'],
            message: '{VALUE} is not a valid condition'
        }
    },
    image: {
        type: String,
        required: [true, 'Book image is required']
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },

    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function(v) {
                return /^\+91[0-9]{10}$/.test(v);
            },
            message: 'Phone number must be in format: +91XXXXXXXXXX'
        }
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['academic', 'non-academic'],
            message: '{VALUE} is not a valid category'
        }
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['available', 'sold'],
            message: '{VALUE} is not a valid status'
        },
        default: 'available'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add text indexes for search
bookSchema.index({ 
    title: 'text', 
    author: 'text', 
    description: 'text' 
});

const Book = mongoose.model('Book', bookSchema);
export default Book;