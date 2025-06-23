import React from 'react';
import dayjs from 'dayjs';
import { Tile, Button } from '@carbon/react';
import { TrashCan } from '@carbon/react/icons';
import styles from './cred-matrix.scss';

export interface CREDEncounter {
  uuid: string;
  number: number;
  date: string;
  labelUser?: string;
  createdByCurrentUser?: boolean;
  onDelete: (id: string) => void;
}

const CredTile: React.FC<CREDEncounter> = ({
  uuid,
  number,
  date,
  createdByCurrentUser = false,
  onDelete,
  labelUser,
}) => {
  return (
    <Tile key={uuid} className={styles.ageTile}>
      <strong>{`CRED Nº ${number}`}</strong>
      <br />
      {dayjs(date).format('DD-MM-YYYY')}
      {labelUser && (
        <>
          <br />
          <small className={styles.labelUser}>{labelUser}</small>
        </>
      )}
      {createdByCurrentUser && (
        <Button
          kind="ghost"
          size="sm"
          hasIconOnly
          iconDescription="Eliminar"
          onClick={() => onDelete(uuid)}
          renderIcon={TrashCan}
          tooltipAlignment="center"
          tooltipPosition="bottom"
        />
      )}
    </Tile>
  );
};

export default CredTile;
