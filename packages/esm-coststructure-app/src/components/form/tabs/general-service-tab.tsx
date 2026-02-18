import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { CostStructureFormValues } from '../schema/costructure-schema';
import { NumberInput } from '@carbon/react';
import { calculateAsignedCostGeneral } from '../../../utils/publicservices';
import NoContent from '../../ui/NoContent/NoContent';
import styles from './tabs.styles.scss';
interface Props {
  form: UseFormReturn<CostStructureFormValues>;
}
export default function GeneralServiceTab({ form }: Props) {
  const { control, setValue, watch } = form;

  const annualServices = watch('annualServicesCost');
  const infrastructures = watch('infrastructures');
  const publicServices = watch('publicServices');
  const totalAreaM2 = infrastructures.reduce((acc, curr) => acc + curr.areaM2, 0);
  return (
    <section className={styles['tab-container']}>
      <div>
        <div className="cds--col">
          <h4 className="cds--heading-04">Servicios Generales</h4>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Controller
          name={`annualServicesCost.annualAdministrativeCost`}
          control={control}
          render={({ field }) => (
            <NumberInput
              hideSteppers
              label="Costo Anual de Administración General"
              helperText="Ingrese el costo anual de administración general"
              id={`annual-administrative-cost`}
              value={field.value}
              onChange={(_, { value }) => field.onChange(Number(value))}
            />
          )}
        />
        <Controller
          name={`annualServicesCost.annualGeneralCost`}
          control={control}
          render={({ field }) => (
            <NumberInput
              hideSteppers
              label="Costo Anual de Servicios Generales"
              helperText="Ingrese el costo anual de servicios generales"
              id={`annual-general-cost`}
              value={field.value}
              onChange={(_, { value }) => field.onChange(Number(value))}
            />
          )}
        />
      </div>
      <hr />
      <div className="cds--row">
        <div className="cds--col cds--spacing-03">
          <table className="cds--data-table cds--data-table--compact cds--data-table--zebra">
            <thead>
              <th>Unidad Productora de Servicios (UPSS)</th>
              <th>Costo de Administración General</th>
              <th>Costo de Servicios Generales</th>
              <th>Producción proyectada de procedimientos</th>
              <th>Costo Administratio Estandar Unitario Indirecto</th>
              <th>Costo Servicios Generales Estandar Unitario Indirecto</th>
            </thead>
            <tbody>
              {infrastructures.length > 0 ? (
                infrastructures.map((infrastructure, index) => {
                  const generalCost = annualServices.annualGeneralCost || 0;
                  const administrativeCost = annualServices.annualAdministrativeCost || 0;
                  const asignedGeneralCost = calculateAsignedCostGeneral(
                    generalCost,
                    totalAreaM2,
                    infrastructure.areaM2,
                  );
                  const asignedAdminCost = calculateAsignedCostGeneral(
                    administrativeCost,
                    totalAreaM2,
                    infrastructure.areaM2,
                  );
                  const proyectedProduction = publicServices[index]?.productionProyected;
                  let adminCostUnit = 0;
                  let generalCostUnit = 0;
                  if (proyectedProduction > 0) {
                    adminCostUnit = asignedAdminCost / proyectedProduction;
                    generalCostUnit = asignedGeneralCost / proyectedProduction;
                  }
                  return (
                    <tr key={index}>
                      <td>{infrastructure.infrastructureName || 'Sin seleccionar'}</td>
                      <td>{asignedAdminCost}</td>
                      <td>{asignedGeneralCost}</td>
                      <td>
                        <Controller
                          name={`publicServices.${index}.productionProyected`}
                          control={control}
                          render={({ field }) => (
                            <NumberInput
                              hideSteppers
                              id={`phone-${index}`}
                              value={field.value}
                              onChange={(_, { value }) => {
                                field.onChange(Number(value));
                              }}
                              min={0}
                            />
                          )}
                        />
                      </td>
                      <td>{adminCostUnit}</td>
                      <td>{generalCostUnit}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className={styles['empty-state-container']}>
                    <NoContent
                      title="No seleccionó infrastructuras"
                      message="Añada algunas infrastructuras previamente"
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
