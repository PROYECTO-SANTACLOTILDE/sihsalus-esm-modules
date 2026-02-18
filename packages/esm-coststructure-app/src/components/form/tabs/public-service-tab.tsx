import { Controller, UseFormReturn } from 'react-hook-form';
import { NumberInput, Button } from '@carbon/react';
import { CostStructureFormValues } from '../schema/costructure-schema';
import React from 'react';
import { calculateAsignedCost, calculateInductor } from '../../../utils/publicservices';
import styles from './tabs.styles.scss';
import NoContent from '../../ui/NoContent/NoContent';
interface Props {
  form: UseFormReturn<CostStructureFormValues>;
}

export default function PublicServicesTab({ form }: Props) {
  const { control, watch, setValue } = form;

  const infrastructures = watch('infrastructures');
  const publicServices = watch('publicServices');
  const annualServices = watch('annualServicesCost');

  return (
    <section className={styles['tab-container']}>
      <div className="">
        <div className="cds--col">
          <h4 className="cds--heading-04">Servicios Públicos</h4>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Controller
          name={`annualServicesCost.annualEnergyCost`}
          control={control}
          render={({ field }) => (
            <NumberInput
              hideSteppers
              label="Costo Anual de Energía"
              helperText="Ingrese el costo anual de energía"
              id={`annual-energy-cost`}
              value={field.value}
              onChange={(_, { value }) => field.onChange(Number(value))}
            />
          )}
        />
        <Controller
          name={`annualServicesCost.annualWaterCost`}
          control={control}
          render={({ field }) => (
            <NumberInput
              hideSteppers
              label="Costo Anual de Agua"
              helperText="Ingrese el costo anual de agua"
              id={`annual-water-cost`}
              value={field.value}
              onChange={(_, { value }) => field.onChange(Number(value))}
            />
          )}
        />
        <Controller
          name={`annualServicesCost.annualPhoneNetCost`}
          control={control}
          render={({ field }) => (
            <NumberInput
              hideSteppers
              label="Costo Anual de Teléfono"
              helperText="Ingrese el costo anual de teléfono"
              id={`annual-phonenet-cost`}
              value={field.value}
              onChange={(_, { value }) => field.onChange(Number(value))}
            />
          )}
        />
      </div>
      <div className="cds--row">
        <div className="cds--col cds--spacing-03">
          <table className="cds--data-table cds--data-table--compact cds--data-table--zebra">
            <thead>
              <tr>
                <th>Unidad Productora de Servicios (UPSS)</th>
                <th>Consumo de Energía</th>
                <th>Consumo de Agua</th>
                <th>Consumo de Teléfono</th>
                <th>Inductores de Agua</th>
                <th>Inductores de Energía</th>
                <th>Inductores de Teléfono</th>
              </tr>
            </thead>

            <tbody>
              {/* Renderizar una fila por cada infraestructura */}
              {infrastructures.length > 0 ? (
                infrastructures.map((infrastructure, index) => (
                  <tr key={index}>
                    <td>{infrastructure.infrastructureName || 'Sin seleccionar'}</td>{' '}
                    {/* Mostrar el nombre de la infraestructura */}
                    {/* Consumo de energía */}
                    <td>
                      <Controller
                        name={`publicServices.${index}.energyConsumption`}
                        control={control}
                        render={({ field }) => (
                          <NumberInput
                            hideSteppers
                            id={`energy-${index}`}
                            value={field.value}
                            onChange={(_, { value }) => {
                              field.onChange(Number(value));
                              setValue(
                                `publicServices.${index}.energyInductor`,
                                calculateInductor(Number(value), infrastructure.areaM2),
                              );
                            }}
                            min={0}
                          />
                        )}
                      />
                    </td>
                    {/* Consumo de agua */}
                    <td>
                      <Controller
                        name={`publicServices.${index}.waterConsumption`}
                        control={control}
                        render={({ field }) => (
                          <NumberInput
                            hideSteppers
                            id={`water-${index}`}
                            value={field.value}
                            onChange={(_, { value }) => {
                              field.onChange(Number(value));
                              setValue(
                                `publicServices.${index}.waterInductor`,
                                calculateInductor(Number(value), infrastructure.areaM2),
                              );
                            }}
                            min={0}
                          />
                        )}
                      />
                    </td>
                    {/* Consumo de teléfono */}
                    <td>
                      <Controller
                        name={`publicServices.${index}.phoneNetConsumption`}
                        control={control}
                        render={({ field }) => (
                          <NumberInput
                            hideSteppers
                            id={`phone-${index}`}
                            value={field.value}
                            onChange={(_, { value }) => {
                              field.onChange(Number(value));
                              setValue(
                                `publicServices.${index}.phoneNetInductor`,
                                calculateInductor(Number(value), infrastructure.areaM2),
                              );
                            }}
                            min={0}
                          />
                        )}
                      />
                    </td>
                    <td>{calculateInductor(publicServices[index].energyConsumption, infrastructure.areaM2)}</td>
                    <td>{calculateInductor(publicServices[index].waterConsumption, infrastructure.areaM2)}</td>
                    <td>{calculateInductor(publicServices[index].phoneNetConsumption, infrastructure.areaM2)}</td>
                    {/* Total de inductores */}
                  </tr>
                ))
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
      <hr />
      <div>
        <div className="cds--col">
          <h4 className="cds--heading-04">Costos anuales de Servicios</h4>
        </div>
        <div className="cds--row">
          <div className="cds--col cds--spacing-03">
            <table className="cds--data-table cds--data-table--compact cds--data-table--zebra">
              <thead>
                <tr>
                  <th>UPS</th>
                  <th>Costo de Energía</th>
                  <th>Costo de Agua</th>
                  <th>Costo de Teléfono e Internet</th>
                  <th>Costo Total Asignado</th>
                  <th>Producción proyectada de procedimientos</th>
                  <th>Costo unitario</th>
                </tr>
              </thead>
              <tbody>
                {infrastructures.length > 0 ? (
                  infrastructures.map((infrastructure, index) => {
                    const waterInductor = publicServices[index].waterInductor;
                    const energyInductor = publicServices[index].energyInductor;
                    const phoneNetInductor = publicServices[index].phoneNetInductor;
                    const totalInductorWater = publicServices.reduce((acc, curr) => acc + curr.waterInductor, 0);
                    const totalInductorEnergy = publicServices.reduce((acc, curr) => acc + curr.energyInductor, 0);
                    const totalInductorPhone = publicServices.reduce((acc, curr) => acc + curr.phoneNetInductor, 0);
                    const totalCostEnergy = calculateAsignedCost(
                      annualServices.annualEnergyCost,
                      totalInductorEnergy,
                      energyInductor,
                    );
                    const totalCostWater = calculateAsignedCost(
                      annualServices.annualWaterCost,
                      totalInductorWater,
                      waterInductor,
                    );
                    const totalCostPhone = calculateAsignedCost(
                      annualServices.annualPhoneNetCost,
                      totalInductorPhone,
                      phoneNetInductor,
                    );
                    const totalCostAssigned = totalCostEnergy + totalCostWater + totalCostPhone;
                    const costPerUnit =
                      publicServices[index].productionProyected > 0
                        ? totalCostAssigned / publicServices[index].productionProyected
                        : 0;
                    return (
                      <tr key={index}>
                        <td>{infrastructure.infrastructureName || 'Sin seleccionar'}</td>
                        <td>{totalCostEnergy}</td>
                        <td>{totalCostWater}</td>
                        <td>{totalCostPhone}</td>
                        <td>{totalCostAssigned}</td>
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
                        <td>{costPerUnit}</td>
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
      </div>
    </section>
  );
}
