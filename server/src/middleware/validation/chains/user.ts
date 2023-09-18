import { ValidationChain, body } from 'express-validator';
import {
  alreadyExistsMsg,
  betweenIntsMsg,
  maxLengthMsg,
  minLengthMsg,
  requiredMsg,
} from '../error-messages';
import { Response } from 'express';
import { TokenData } from '../../../types';
import { selectUserByUsername } from '../../../services';

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
  return body('jobTitle')
    .trim()
    .notEmpty()
    .withMessage(requiredMsg())
    .isLength({ max: 50 })
    .withMessage(maxLengthMsg(50));
};

export const checkAuthLevel = (): ValidationChain => {
  return body('authLevel')
    .notEmpty()
    .withMessage(requiredMsg())
    .isInt({ min: 1, max: 4 })
    .withMessage(betweenIntsMsg(1, 4));
};

export const checkUsernameIsTaken = (res: Response<any, TokenData>): ValidationChain => {
  return body('username').custom(async (value: string) => {
    const findUser = await selectUserByUsername(value, res.locals.teamId);
    if (!findUser[0].length) return Promise.reject(alreadyExistsMsg());
  });
};
