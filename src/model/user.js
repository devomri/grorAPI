import * as q from 'q';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

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

    // Hash the password using 10 rounds of salt
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err)
            return next(err);

        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function (candidatePassword){
    return q.ninvoke(bcrypt, 'compare', candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;