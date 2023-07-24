import { ValidationChain, body } from 'express-validator';
import { maxLengthMsg, minLengthMsg, requiredMsg } from '../error-messages';

export const checkUsername = (): ValidationChain => {
  return body('username')
    .trim()
    .notEmpty()
    .withMessage(requiredMsg())
    .isAlphanumeric()
    .withMessage('Username must only contain alphanumeric characters')
    .isLength({ max: 50 })
    .withMessage(maxLengthMsg(50));
};

export const checkPassword = (isSigningUp: boolean): ValidationChain => {
  return body('password')
    .trim()
    .notEmpty()
    .withMessage(requiredMsg())
    .isLength({ min: 8 })
    .withMessage(minLengthMsg(8))
    .custom((value: string, { req }) => {
      if (isSigningUp && value !== req.body.confirmPassword) {
        return Promise.reject('Passwords do not match');
      }
      return true;
    });
};

export const checkFirstNameOrLastName = (name: 'firstName' | 'lastName'): ValidationChain => {
  return body(name)
    .trim()
    .notEmpty()
    .withMessage(requiredMsg())
    .isLength({ max: 100 })
    .withMessage(maxLengthMsg(100));
};

export const checkJobTitle = (): ValidationChain => {
  return body('jobTitle').trim().notEmpty().isLength({ max: 50 }).withMessage(maxLengthMsg(50));
};
