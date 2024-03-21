import mongoose, {model , Schema , Types} from "mongoose";

const guardianSchema = new Schema({
  profileImage: {
    url: {
      type: String,
      default:
        "https://res.cloudinary.com/dna1fzuwy/image/upload/v1710776634/Default_pfp.svg_u0n9ha.png",
    },
    publicId: {
      type: String,
      default: "Default_pfp.svg_u0n9ha",
    },
  },
  firstName: { type: String, required: true, min: 3, max: 20 },
  lastName: { type: String, required: true, min: 3, max: 20 },
  userName: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 30
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
  
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true
  },
  phoneNumber1: {
      type: String,
      required: true,
  },
  phoneNumber2: {
      type: String,
  },
  homeAddress: {
      type: String,
      required: true,
  },
  patientId: {
      type: Types.ObjectId,
      ref: 'Patient',
  },
  isConfirmed: {
      type: Boolean,
      default: false
  },
  status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline"
  },
  role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
  },
  forgetCode: String,
  activationCode: String,
  },{
    timestamps: true
});
  
  const guardianModel = mongoose.model.guardian || model('Guardian', guardianSchema)
  export default guardianModel
