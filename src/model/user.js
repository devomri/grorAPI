import * as q from 'q';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    id: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    organizationId: String,
    phoneNumber: String
});

// Saving the user's password hashed in the DB (security purposes)
userSchema.pre('save', function(next) {
    let self = this;

    // Generate a salt
    bcrypt.genSalt(10, (err, salt) => {
        if (err)
            return next(err);

        // Hash the password using the new salt
        bcrypt.hash(self.password, salt, (err, hash) => {
            self.password = hash;

            next();
        })
    });
});

userSchema.methods.comparePassword = (candidatePassword) => {
    return q.ninvoke(bcrypt, 'compare', candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;