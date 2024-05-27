import SignInComponent from '../components/sign-in';
import { PATH } from '../path';

// TODO: пропрацювати обробку помилок
export default function SignInPage() {
  return (
    <SignInComponent
      title="Please, enter your credentials."
      authTitle="Sign In"
      redirectTitle="Sign Up"
      redirectTo={`/${PATH.auth.group}/${PATH.auth.register}`}
    />
  );
}
