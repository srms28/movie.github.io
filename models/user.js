const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  
  review:{
    items:[
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        value:{
          type:Number,
        }

      }
    ]
  }

  
});



module.exports = mongoose.model('User', userSchema);

