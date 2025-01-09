import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { t } = useTranslation();
    
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>{t('login')}</button>;
};

export default LoginButton;