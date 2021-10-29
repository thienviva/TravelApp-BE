 const defaultModel = {
  date: { type: Date },
  string: { type: String, default: "" },
  stringR: { type: String, required: true },
  stringRef: { type: String, required: true, match: /^[a-fA-F0-9]{24}$/ },
  stringPhone: { type: String, required: true, match: /^0\d{9}$/ },
  stringUnique: { type: String, required: true, unique: true },
  array: { type: Array, default: [] },
  number: { type: Number, default: 0 },
  boolean: { type: Boolean, default: true },
  booleanFalse: { type: Boolean, default: false },
  object: { type: Object, default: {} },
  stringImage: {type: String, default: "https://firebasestorage.googleapis.com/v0/b/travel-app-34be2.appspot.com/o/unknown.jpg?alt=media&token=3dbbbcec-60e1-419b-89b8-cedb9d7f0514"},
};
const defaultRoles = {
  User: 0,
  Admin: 1,
  Staff:2
}

const defaultEnterprises = {
  Enterprise:0,
  Hotel: 1,
  Restaurant:2
}

const defaultVehicles = {
  Car: 0,
  Bus: 1,
  Ship: 2,
  Plane: 3
}

const defaultStatus = {
  ACTIVE: 0,
  INACTIVE: 1,
  LOCK: 2,
  DELETE: 3
}

const defaultChatSocket={
  sendMessageSSC:"SEND_MESSAGE_SSC",
  sendMessageCSS:"SEND_MESSAGE_CSS", 
  joinRoomCSS:"JOIN_ROOM_CSS",
  leaveRoomCSS:"LEAVE_ROOM_CSS"
}

const defaultStatusPayment = {
  unpaid:0,
  paid:1
}

module.exports ={
  defaultModel,
  defaultRoles,
  defaultEnterprises,
  defaultVehicles,
  defaultStatus,
  defaultChatSocket,
  defaultStatusPayment
}