import joi from "joi";

const data = {
    postData : joi.object({
        id:joi.string(),
        firstname : joi.string(),
        lastname : joi.object(),
        location : joi.string()
    })
}

export default data;