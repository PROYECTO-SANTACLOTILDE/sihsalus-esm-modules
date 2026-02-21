import React from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { Tile, Button } from '@carbon/react';
import { TrashCan } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import type { ControlStatus } from '../../../hooks/useCREDSchedule';
import styles from './cred-matrix.scss';

export interface CredTileProps {
  uuid?: string;
  controlNumber: number;
  label: string;
  date?: string | Date;
  status: ControlStatus;
  createdByCurrentUser?: boolean;
  onDelete?: (id: string) => void;
}

const CredTile: React.FC<CredTileProps> = ({
  uuid,
  controlNumber,
  label,
  date,
  status,
  createdByCurrentUser = false,
  onDelete,
}) => {
  const { t } = useTranslation();

  const statusLabels: Record<ControlStatus, string> = {
    completed: t('statusCompleted', 'Realizado'),
    scheduled: t('statusScheduled', 'Programado'),
    overdue: t('statusOverdue', 'Vencido'),
    pending: t('statusPending', 'Pendiente'),
    future: t('statusFuture', 'Futuro'),
  };

  return (
    <Tile
      className={classNames(styles.ageTile, {
        [styles.tileCompleted]: status === 'completed',
        [styles.tileScheduled]: status === 'scheduled',
        [styles.tileOverdue]: status === 'overdue',
        [styles.tilePending]: status === 'pending',
        [styles.tileFuture]: status === 'future',
      })}
    >
      <strong>{`#${controlNumber}`}</strong>
      <div className={styles.tileLabel}>{label}</div>
      {date && <div className={styles.tileDate}>{dayjs(date).format('DD/MM/YYYY')}</div>}
      <div className={classNames(styles.statusBadge, styles[`status-${status}`])}>{statusLabels[status]}</div>
      {createdByCurrentUser && uuid && onDelete && (
        <Button
          kind="ghost"
          size="sm"
          hasIconOnly
          iconDescription={t('delete', 'Eliminar')}
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
