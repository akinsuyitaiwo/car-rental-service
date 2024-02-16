import Joi from "joi";


const options = {
	stripUnknown: true,
	abortEarly: false,
	errors: {
		wrap: {
			label: ""
		}
	}
};

const validateSignUpUser = (User) =>{
    const schema = Joi.object({
        username: Joi.string().min(4).max(50).required(),
        password: Joi.string().min(4).max(50).required(),
        role: Joi.string().valid("Rider", "Sender").required()
    });
    return schema.validate(User, options);
};

const validateSignInUser = (User) =>{
    const schema = Joi.object({
        username: Joi.string().min(4).max(50).required(),
        password: Joi.string().min(4).max(50).required()
    });
    return schema.validate(User, options);
};




export  {validateSignUpUser, validateSignInUser}