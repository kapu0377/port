import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';


const TranslatedComment = ({ section, id, defaultText }) => {
  const { t } = useTranslation();
  const translationKey = `codeComments.${section}.${id}`;
  const translatedText = t(translationKey, { ns: 'translation' });
  
  if (translationKey === translatedText) {
    console.warn(`[i18n] 번역 누락: ${translationKey}`);
    return <>{defaultText}</>;
  }
  
  return <>{translatedText}</>;
};

TranslatedComment.propTypes = {
  section: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  defaultText: PropTypes.string.isRequired
};

export default TranslatedComment; 