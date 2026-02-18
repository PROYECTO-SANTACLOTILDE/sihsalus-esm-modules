import React, { useState } from 'react';
import { TextInput } from '@carbon/react';
import useGetProcedures from '../../../hooks/use-get-procedures';
import type { Procedure } from '../../../hooks/use-get-procedures';
import styles from './styles.scss';
interface Props {
  value: Procedure;
  onChange: (value: Procedure) => void;
  error?: string;
}

export const ProcedureAutocomplete: React.FC<Props> = ({ value, onChange, error }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { procedures, isLoading } = useGetProcedures(value.nameFull);

  return (
    <div className={styles.container}>
      <TextInput
        id="procedureName"
        labelText="Nombre del procedimiento"
        value={value.nameFull}
        onChange={(e) => {
          onChange({ ...value, nameFull: e.target.value });
          setShowSuggestions(true);
        }}
        placeholder="Ingrese el nombre del procedimiento"
        invalid={!!error}
        invalidText={error}
        autoComplete="off"
      />

      {showSuggestions && value.nameFull.length >= 2 && (
        <div className={styles['procedure-list']}>
          {isLoading && <div className="p-2 text-sm text-muted-foreground">Cargando...</div>}

          {!isLoading &&
            procedures.map((p) => (
              <div
                key={p.conceptId}
                onClick={() => {
                  onChange(p);
                  setShowSuggestions(false);
                }}
                className={styles.procedure}
              >
                <p>{p.nameFull}</p>
                {p.code && <p>Código: {p.code}</p>}
              </div>
            ))}
        </div>
      )}

      <TextInput id="procedureCode" labelText="Código CPMS" value={value.code || ''} readOnly placeholder="Ej: 00906" />
    </div>
  );
};
