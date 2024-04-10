import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { SignUpInput } from '../dto/signup-input';

@ValidatorConstraint({ name: 'IsPasswordsMatching', async: false })
export class IsPasswordsMatchingConstraint
  implements ValidatorConstraintInterface
{
  validate(passwordRepeat: string, args: ValidationArguments) {
    const obj = args.object as SignUpInput;
    return obj.password === passwordRepeat;
  }

  defaultMessage(): string {
    return 'Пароли не совпадают';
  }
}
