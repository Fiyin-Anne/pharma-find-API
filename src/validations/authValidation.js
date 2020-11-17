import Joi from "joi";

const registrationValidation = (user) => {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .required()
      .empty()
      .messages({
        "any.required": "Username is required",
        "string.alphanum": "Username must contain only alphanumeric characters",
        "string.base": "Username must be a string",
        "string.empty": "username cannot be an empty field",
        "string.min": "Username is too short"
      }),
    phone_number: Joi.string()
      .required()
      .length(11)
      .empty()
      .pattern(/^[0-9]/)
      .messages({
        "any.required": "Phone number is required",
        "string.empty": "Cannot be an empty field",
        "string.base": "Phone number must be a string",
        "string.pattern.base": "Phone number must contain only digits",
        "string.length": "Phone number length is incorrect"
      }),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "uk", "co"] } })
      .empty()
      .messages({
        "any.required": "Email is required",
        "string.base": "Email must be a string",
        "string.empty": "Email cannot be empty",
        "string.email": "Please enter a valid email",
      }),
    password: Joi.string()
      .required()
      .empty()
      .min(5)
      .max(1024)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .messages({
        "any.required": "Password is required",
        "string.pattern.base": "Password must contain only alphanumeric characters.",
        "string.empty": "Password cannot be an empty field",
        "string.min": "Password not strong enough"
      }),
    verify_password: Joi.string()
  }).messages({
    "object.unknown": "You have used an invalid key."
  }).options({ abortEarly: false });
  return schema.validate(user);
};

const loginValidation = (user) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "uk", "co"] } })
      .empty()
      .messages({
        "any.required": "Email is required",
        "string.empty": "Email cannot be empty",
        "string.email": "Please enter a valid email",
      }),
    password: Joi.string()
      .required()
      .empty()
      .messages({
        "any.required": "Password is required",
        "string.empty": "Password cannot be an empty field",
      }),
  }).messages({
    "object.unknown": "You have used an invalid key."
  }).options({ abortEarly: false });
  return schema.validate(user);
};

export { registrationValidation, loginValidation };
