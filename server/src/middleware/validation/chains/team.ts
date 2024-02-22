import { ValidationChain, body } from 'express-validator';
import { alreadyExistsMsg, maxLengthMsg, requiredMsg } from '../error-messages';
import { selectTeamByTeamName } from '../../../services';
import { Response } from 'express';

export const checkTeamName = (): ValidationChain => {
  return body('teamName')
    .trim()
    .notEmpty()
    .withMessage(requiredMsg())
    .isLength({ max: 100 })
    .withMessage(maxLengthMsg(100));
};

export const checkDbIfTeamNameExists = (isSigningUp: boolean, res: Response): ValidationChain => {
  return body('teamName').custom(async (value: string) => {
    const findTeam = await selectTeamByTeamName(value);
    // check if team name already in use during sign up
    if (findTeam[0].length && isSigningUp) return Promise.reject(alreadyExistsMsg());
    // check if team name was not found during login
    else if (!findTeam[0].length && !isSigningUp) return Promise.reject('Team name not found');

    // if logging in, save team id to locals for username validation check and then creation of JWTs
    if (!isSigningUp) {
      res.locals.teamId = findTeam[0][0].id;
      res.locals.teamName = findTeam[0][0].teamName;
    }
  });
};
