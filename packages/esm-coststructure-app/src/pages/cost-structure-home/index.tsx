import { Button, Select, Search, Pagination } from '@carbon/react';
import React, { useState } from 'react';
import styles from './styles.scss';
import HomeTable from '../../components/tables/home/table.component';
import { Add, Filter } from '@carbon/icons-react';
import useGetCostStructure from '../../hooks/use-get-coststructure';
import PageHeader from '../../components/ui/PageHeader/pageHeader';
import { WhitePaper } from '@carbon/icons-react';
const CostStructureSearch: React.FC = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [query, setQuery] = useState('');
  const { costStructure, total, isLoading, isError } = useGetCostStructure(page - 1, size, query);

  if (isLoading) return <p>Cargando estructuras de costos...</p>;
  if (isError) return <p>Error al cargar estructuras de costos.</p>;

  return (
    <div>
      <PageHeader icon={<WhitePaper size={48} />} title="Estructura de Costos – CPMS" subtitle="Costeo" />
      <article className={styles.card}>
        <div className={styles.container}>
          <h3>Costeo de Procedimientos médicos Guardados</h3>
          <Button renderIcon={Add}>Añadir</Button>
        </div>
        <div>
          <div className={styles.search}>
            <Search labelText="" placeholder="Ejm: 00906 o Anestesia para vulvectomía" />
            <Button hasIconOnly kind="ghost" renderIcon={Filter} iconDescription="Filter button" />
          </div>
          <HomeTable data={costStructure} />
          <Pagination
            page={page}
            pageSize={size}
            totalItems={total}
            pageSizes={[5, 10, 20, 50]}
            onChange={({ page, pageSize }) => {
              setPage(page);
              setSize(pageSize);
            }}
          />
        </div>
      </article>
    </div>
  );
};

export default CostStructureSearch;
