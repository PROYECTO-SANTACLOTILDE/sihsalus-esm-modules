import React from 'react';
import { useState } from 'react';
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form';
import { CostStructureFormValues } from '../schema/costructure-schema';
import useGetInfrastructure from '../../../hooks/use-get-infrastructure';
import { Button, IconButton, NumberInput, Select, SelectItem, Table } from '@carbon/react';
import { Add, TrashCan } from '@carbon/react/icons';
import { calculateDepreciationByMinutes, calculateTotalValidConsruction } from '../../../utils/infrastructure';
import styles from './tabs.styles.scss';
import NoContent from '../../ui/NoContent/NoContent';
interface CalculateFields {
  totalConstruction: number;
  depreciationPerMinute: number;
  cost?: number;
}

interface Props {
  form: UseFormReturn<CostStructureFormValues>;
}
export default function InfrastructureTab({ form }: Props) {
  const [calculateFields, setCalculateFields] = useState<CalculateFields[]>([]);

  const { infrastructure: infrastructures } = useGetInfrastructure();
  const { control, setValue, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'infrastructures',
  });

  const { fields: publicServiceFields, append: publicServiceAppend } = useFieldArray({
    control,
    name: 'publicServices',
  });

  const handleCreateRow = () => {
    append({
      infrastructureId: 0,
      areaM2: 0,
      constructionCost: 0,
      timePerformanceMinutes: 0,
      infrastructureName: '',
    });
    publicServiceAppend({
      ups: '',
      energyConsumption: 0,
      waterConsumption: 0,
      phoneNetConsumption: 0,
      energyInductor: 0,
      waterInductor: 0,
      phoneNetInductor: 0,
      totalCostEnergy: 0,
      totalCostWater: 0,
      totalCostPhoneNet: 0,
      totalCost: 0,
      productionProyected: 0,
    });
  };

  return (
    <section className={styles['tab-container']}>
      <div>
        <div className="cds--col">
          <h4 className="cds--heading-04">Infraestructura</h4>
        </div>
        <div className="cds--col" style={{ textAlign: 'right' }}>
          <Button kind="primary" size="md" onClick={handleCreateRow}>
            <Add size={16} />
            Agregar Infraestructura
          </Button>
        </div>
      </div>
      {/* Tabla editable */}
      <div className="cds--row">
        <div className="cds--col cds--spacing-03">
          <table className="cds--data-table cds--data-table--compact cds--data-table--zebra">
            <thead>
              <tr>
                <th>UPS</th>
                <th>Área (m²)</th>
                <th>Costo Construcción (S/.)</th>
                <th>Valor Total de Construcción de UPSS(S/.)</th>
                <th>Valor de depreciación de UPS por Minuto(S/.)</th>
                <th>Tiempo de Rendimiento de UPSS (min) </th>
                <th>Costo Estandar (S/.)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {fields.length > 0 ? (
                fields.map((row, index) => (
                  <tr key={row.id}>
                    <td>
                      <Controller
                        name={`infrastructures.${index}.infrastructureId`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            id="infrastructure-select-{{index}}"
                            key={row.id}
                            {...field}
                            onChange={(e) => {
                              const id = e.target.value;
                              field.onChange(id);

                              const infra = infrastructures.find((i) => i.id === Number(id));
                              if (infra) {
                                setValue(`infrastructures.${index}.areaM2`, infra.areaM2);
                                setValue(`infrastructures.${index}.constructionCost`, infra.constructionCost);
                                setValue(`infrastructures.${index}.infrastructureName`, infra.locationName);
                              }
                              const totalConstruction = calculateTotalValidConsruction(
                                infra?.areaM2 || 0,
                                infra?.constructionCost || 0,
                              );
                              const depreciationPerMinute = calculateDepreciationByMinutes(totalConstruction);
                              const newCalculateFields = [...calculateFields];
                              if (!newCalculateFields[index]) {
                                newCalculateFields.push({ totalConstruction, depreciationPerMinute });
                              } else {
                                newCalculateFields[index] = { totalConstruction, depreciationPerMinute };
                              }
                              setCalculateFields(newCalculateFields);
                            }}
                            labelText=""
                          >
                            <SelectItem text="Seleccione infraestructura" value="" />
                            {infrastructures.map((infra) => (
                              <SelectItem key={infra.id} text={infra.locationName} value={infra.id.toString()} />
                            ))}
                          </Select>
                        )}
                      />
                    </td>

                    <td>
                      <Controller
                        name={`infrastructures.${index}.areaM2`}
                        control={control}
                        render={({ field }) => (
                          <NumberInput
                            hideSteppers
                            id={`area-${index}`}
                            value={field.value}
                            readOnly
                            label=""
                            disabled
                          />
                        )}
                      />
                    </td>

                    <td>
                      <Controller
                        name={`infrastructures.${index}.constructionCost`}
                        control={control}
                        render={({ field }) => (
                          <NumberInput hideSteppers id={`cost-${index}`} value={field.value} label="" readOnly />
                        )}
                      />
                    </td>
                    <td>{calculateFields[index] ? calculateFields[index].totalConstruction : 0}</td>
                    <td>{calculateFields[index] ? calculateFields[index].depreciationPerMinute : 0}</td>
                    <td>
                      <Controller
                        name={`infrastructures.${index}.timePerformanceMinutes`}
                        control={control}
                        render={({ field }) => (
                          <NumberInput
                            hideSteppers
                            id={`time-${index}`}
                            value={field.value}
                            label=""
                            {...field}
                            onBlur={() => {
                              const depreciationPerMinute = calculateFields[index]?.depreciationPerMinute || 0;
                              const cost = depreciationPerMinute * Number(field.value);
                              const newCalculateFields = [...calculateFields];
                              newCalculateFields[index] = { ...newCalculateFields[index], cost };
                              setCalculateFields(newCalculateFields);
                            }}
                          />
                        )}
                      />
                    </td>
                    <td>{calculateFields[index] ? calculateFields[index].cost : 0}</td>
                    <td>
                      <TrashCan size={16} onClick={() => remove(index)} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className={styles['empty-state-container']}>
                    <NoContent title="No hay Infraestructuras añadidas" message="Añada alguna Infraestructura" />
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
