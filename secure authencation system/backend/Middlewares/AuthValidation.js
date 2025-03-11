const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(100).required().messages({
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name must be at least 3 characters long',
            'string.max': 'Name cannot exceed 100 characters',
            'any.required': 'Name is required'
        }),
        email: Joi.string().trim().email().required().messages({
            'string.empty': 'Email cannot be empty',
            'string.email': 'Invalid email format',
            'any.required': 'Email is required'
        }),
        password: Joi.string().trim().min(4).max(100).required().messages({
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password must be at least 4 characters long',
            'string.max': 'Password cannot exceed 100 characters',
            'any.required': 'Password is required'
        })
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: "Validation error",
            errors: error.details.map(err => err.message) // Extracts user-friendly error messages
        });
    }

    next();
}

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().trim().email().required().messages({
            'string.empty': 'Email cannot be empty',
            'string.email': 'Invalid email format',
            'any.required': 'Email is required'
        }),
        password: Joi.string().trim().min(4).max(100).required().messages({
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password must be at least 4 characters long',
            'string.max': 'Password cannot exceed 100 characters',
            'any.required': 'Password is required'
        })
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: "Validation error",
            errors: error.details.map(err => err.message)
        });
    }

    next();
}

module.exports = {
    signupValidation,
    loginValidation
}
