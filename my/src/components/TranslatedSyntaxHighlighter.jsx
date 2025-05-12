import React, { useState, useEffect } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const TranslatedSyntaxHighlighter = ({ children, ...props }) => {
  const { t, i18n } = useTranslation();
  const [processedCode, setProcessedCode] = useState(children);
  
  useEffect(() => {
    if (typeof children !== 'string') {
      setProcessedCode(children);
      return;
    }
    
    const lines = children.split('\n');
    const processed = lines.map(line => {
      const inlineRegex = /\/\/\s*TC:([\w_]+)\.([\w_]+)/;
      const inline = inlineRegex.exec(line);
      if (inline) {
        const [_, section, id] = inline;
        const translationKey = `codeComments.${section}.${id}`;
        const translated = t(translationKey, { ns: 'translation' });
        const codePart = line.substring(0, inline.index);
        if (translated !== translationKey) {
          return codePart + `// ${translated}`;
        } else {
          console.warn(`[i18n] 번역 누락: ${translationKey}`);
          return line;
        }
      }
      const blockRegex = /\/\*\s*TC:([\w_]+)\.([\w_]+)\s*\*\//;
      const block = blockRegex.exec(line);
      if (block) {
        const [_, section, id] = block;
        const translationKey = `codeComments.${section}.${id}`;
        const translated = t(translationKey, { ns: 'translation' });
        const pre = line.substring(0, block.index);
        if (translated !== translationKey) {
          return pre + `/* ${translated} */`;
        } else {
          console.warn(`[i18n] 번역 누락: ${translationKey}`);
          return line;
        }
      }
      return line;
    });
    setProcessedCode(processed.join('\n'));
  }, [children, t, i18n.language]);
  
  return (
    <SyntaxHighlighter {...props}>
      {processedCode}
    </SyntaxHighlighter>
  );
};

TranslatedSyntaxHighlighter.propTypes = {
  children: PropTypes.string
};

TranslatedSyntaxHighlighter.registerLanguage = (name, language) => {
  SyntaxHighlighter.registerLanguage(name, language);
};

export default TranslatedSyntaxHighlighter; 