import React from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';
import Popover from '../popover';
import style from './index.module.scss';

export function LanguagePopover({
  onChange
}: {
  onChange: (language: string) => void;
}) {
  const intl = useIntl();
  return (
    <div className={style.wrapper}>
      {Object.keys(SUPPORTED_LANGUAGES).map((key) => (
        <div
          className={[
            `${style.item} ${
              intl.locale === SUPPORTED_LANGUAGES[key].type && style.item_active
            }`
          ].join('')}
          key={key}
          onClick={() => {
            onChange(SUPPORTED_LANGUAGES[key].type);
          }}
        >
          <div>
            <span className={style.item_title}>
              {SUPPORTED_LANGUAGES[key].name}
            </span>
            <span className={style.item_label}>{key}</span>
          </div>
          {intl.locale === SUPPORTED_LANGUAGES[key].type && (
            <div className={style.item_active_tri}>
              <i className="iconfont icon-check" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Language({
  visible,
  onCancel,
  onBack,
  changeLanguage
}: {
  visible: boolean;
  onCancel: () => void;
  onBack: () => void;
  changeLanguage?: (language: string) => void;
}) {
  return (
    <Popover visible={visible} onBack={onBack} onCancel={onCancel}>
      <LanguagePopover
        onChange={(language) => {
          changeLanguage && changeLanguage(language);
        }}
      />
    </Popover>
  );
}

const mapStateToProps = (state: any) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch: any) => ({
  changeLanguage: (language: string) => {
    dispatch({
      type: 'changeLanguage',
      language: language
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Language);
