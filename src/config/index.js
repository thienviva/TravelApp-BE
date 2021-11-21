require('dotenv').config();
const configEnv = {
	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
	JWT_KEY: process.env.JWT_KEY,
	MONGO_URI: process.env.MONGO_URI,
	PORT: process.env.PORT,
	BUCKET: process.env.BUCKET,
	REGION: process.env.REGION,
	AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
	AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
	Email: process.env.Email,
	Password: process.env.Password,
	CLIENT_ID: process.env.CLIENT_ID,
	CLIENT_SECRET: process.env.CLIENT_SECRET
};
const DFRoleValue = ["User", "Admin","Staff"]
const DFVehiclesValue = ["Car","Bus", "Ship", "Plane"]
const DFEnterprisesValue = ["Enterprise","Hotel", "Restaurant"]
const DFStatusesValue = ["ACTIVE","INACTIVE", "LOCK", "DELETE"]
module.exports = {
	configEnv,
	DFRoleValue,
	DFVehiclesValue,
	DFEnterprisesValue,
	DFStatusesValue,
};