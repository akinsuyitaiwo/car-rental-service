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

const validateCreateOrder = (order) => {
    const schema = Joi.object({
        senderLocation: Joi.string().required(),
        recipientLocation: Joi.string().required(),
        price: Joi.number().required()
    })
    return schema.validate(order, options)
};
export default validateCreateOrder