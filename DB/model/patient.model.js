import mongoose, {Schema, Types, model} from "mongoose";

const patientSchema = new Schema({
  profileImage: {
    url: {
      type: String,
      default:
        "https://res.cloudinary.com/dna1fzuwy/image/upload/v1710776634/Default_pfp.svg_u0n9ha.png"
    },
    publicId: {
      type: String,
      default: "Default_pfp.svg_u0n9ha"
    },
  },
    firstName: {
      type: String,
      required: true
  },
    lastName: {
      type: String,
      required: true
  },
    email: {
      type: String,
      required: true,
      unique: true
  },
    confirmEmail: {
      type: Boolean,
      default: false 
  },   
    password: {
      type: String,
      required: true
  },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true
  },
    homeAddress: {
      type: String,
      required: true
  },
    phoneNumber1: {
      type: String,
      required: true 
  },
    phoneNumber2: String,

    birthDate: {
      type: Date,
      required: true
  },
    forgetCode: String,
    activationCode: String,
  },{
    timestamps: true
});
  
  const Patient = mongoose.models.patient || model('Patient', patientSchema)
  
  export default Patient