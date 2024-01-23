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

const validateSignUpSender = (sender) =>{
    const schema = Joi.object({
        username: Joi.string().min(4).max(50).required(),
        password: Joi.string().min(4).max(50).required()
    });
    return schema.validate(sender, options);
};

const validateSignInSender = (sender) =>{
    const schema = Joi.object({
        username: Joi.string().min(4).max(50).required(),
        password: Joi.string().min(4).max(50).required()
    });
    return schema.validate(sender, options);
};




export  {validateSignUpSender, validateSignInSender}