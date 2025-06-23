import React from 'react';
import { useTranslation } from 'react-i18next';
import { Field } from '../../field/field.component';
import styles from '../section.scss';

export interface InsuranceDetailsSectionProps {
  fields: Array<string>;
}

export const InsuranceDetailsSection: React.FC<InsuranceDetailsSectionProps> = ({ fields }) => {
  return (
    <section className={styles.formSection} aria-label="Insurance Details Section">
      {fields.map((field) => (
        <Field key={`insurance-details-${field}`} name={field} />
      ))}
    </section>
  );
};
