import { withAuthenticationRequired } from "@auth0/auth0-react";

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div>
        Redirecting you to the login screen. If you are not automatically redirected, click <a href="/login">here</a>.
      </div>
    ),
  });

  return <Component />;
};