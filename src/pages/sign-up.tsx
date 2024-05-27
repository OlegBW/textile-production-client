import SignUpComponent from '../components/sign-up';
import { PATH } from '../path';

// TODO: пропрацювати обробку помилок
export default function SignUpPage() {
  return (
    <SignUpComponent
      title="Please, register your credentials."
      authTitle="Sign Up"
      redirectTitle="Sign In"
      redirectTo={`/${PATH.auth.group}/${PATH.auth.login}`}
    />
  );
}
