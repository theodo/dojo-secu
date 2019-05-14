import { ProfileAction, ProfileState } from './Profile';
import { LoginAction, LoginState } from './Login';

export type RootState = Readonly<{
  user: ProfileState;
  login: LoginState;
}>;
export type RootAction = ProfileAction | LoginAction;
