import joi from "joi";

const data = {
        postData : joi.object({
        id:joi.string(),
        firstname:joi.string().pattern(/^[a-zA-Z0-9]{3,250}$/).required(),
        lastname : joi.string().pattern(/^[a-zA-Z0-9]{3,250}$/),
        number:joi.string().length(10).pattern(/^[0-9]+$/).required(),
        email: joi.string().pattern(/^[a-zA-Z0-9_.+-]{3,}@[a-zA-Z0-9-]+\.(com|net)$/).required(),
        location : joi.string().pattern(/^[a-zA-Z0-9]{3,150}$/)
    })
}

export default data;