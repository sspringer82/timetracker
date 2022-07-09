import { Button } from '@mui/material';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitch(): ReactElement {
  const { i18n } = useTranslation();

  return (
    <div style={{ textAlign: 'right' }}>
      <Button
        onClick={() => i18n.changeLanguage('de')}
        disabled={i18n.language === 'de'}
      >
        DE
      </Button>
      <Button
        onClick={() => i18n.changeLanguage('en')}
        disabled={i18n.language === 'en'}
      >
        EN
      </Button>
    </div>
  );
}

export default LanguageSwitch;
