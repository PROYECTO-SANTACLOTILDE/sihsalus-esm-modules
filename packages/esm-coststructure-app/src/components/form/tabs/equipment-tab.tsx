import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form';
import { CostStructureFormValues } from '../schema/costructure-schema';
import React from 'react';
import { Add, TrashCan } from '@carbon/react/icons';
import { Button, NumberInput, Select, SelectItem } from '@carbon/react';
import useGetEquipment from '../../../hooks/use-get-equipment';
import { calculateCostEquipment, calculateDepreciationMinutes } from '../../../utils/equipments';
import PaperIlustration from '../../ilustration/paper-ilustration';
import styles from './tabs.styles.scss';
import NoContent from '../../ui/NoContent/NoContent';
interface Props {
  form: UseFormReturn<CostStructureFormValues>;
}

export default function EquipmentTab({ form }: Props) {
  const { control, watch, setValue } = form;

  const { equipments } = useGetEquipment();

  const equipmenCostData = watch('equipmentCost') || [];

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'equipmentCost',
  });

  const handleCreateRow = () => {
    append({
      equipmentId: 0,
      price: 0,
      quantity: 0,
      timeMinutes: 0,
      usefullYears: 0,
    });
  };

  return (
    <section className={styles['tab-container']}>
      <div>
        <div className="cds--col">
          <h4 className="cds--heading-04">Equipamientos y Mobiliario</h4>
        </div>
        <div className="cds--col" style={{ textAlign: 'right' }}>
          <Button kind="primary" size="md" onClick={handleCreateRow}>
            <Add size={16} />
            Agregar Equipamientos
          </Button>
        </div>
      </div>
      <div className="cds--row">
        <div className="cds--col cds--spacing-03">
          <table className="cds--data-table cds--data-table--compact cds--data-table--zebra">
            <thead>
              <tr>
                <th>Equipamiento o mobiliario</th>
                <th>Precio de Adquisión (S/.)</th>
                <th>Años de utilidad</th>
                <th>Depreciación por Minuto (S/.)</th>
                <th>Cantidad</th>
                <th>Tiempo de uso (minutos)</th>
                <th>Costo Estandar (S/.)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {fields.length > 0 ? (
                fields.map((row, index) => {
                  const rowData = equipmenCostData[index];

                  const price = rowData?.price || 0;
                  const years = rowData?.usefullYears || 0;
                  const quantity = rowData?.quantity || 0;
                  const timeMinutes = rowData?.timeMinutes || 0;

                  let depPerMinute = 0;
                  let costUnit = 0;

                  if (price > 0 && years > 0) {
                    depPerMinute = calculateDepreciationMinutes(years, price);
                    costUnit = calculateCostEquipment(depPerMinute, timeMinutes, quantity);
                  }

                  return (
                    <tr key={row.id}>
                      <td>
                        <Controller
                          name={`equipmentCost.${index}.equipmentId`}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              id={`equipment-select-${index}`}
                              onChange={(e) => {
                                const id = Number(e.target.value);
                                field.onChange(id);

                                const equip = equipments?.find((i) => i.id === id);
                                if (equip) {
                                  setValue(`equipmentCost.${index}.usefullYears`, equip.usefulLifeYears);
                                }
                              }}
                              labelText=""
                            >
                              <SelectItem text="Seleccione Equipamiento" value="" />
                              {equipments?.map((eq) => (
                                <SelectItem key={eq.id} text={eq.name} value={eq.id} />
                              ))}
                            </Select>
                          )}
                        />
                      </td>

                      <td>
                        <Controller
                          name={`equipmentCost.${index}.price`}
                          control={control}
                          render={({ field }) => (
                            <NumberInput hideSteppers id={`priceEq-${index}`} label="" {...field} />
                          )}
                        />
                      </td>

                      <td>
                        <Controller
                          name={`equipmentCost.${index}.usefullYears`}
                          control={control}
                          render={({ field }) => (
                            <NumberInput readOnly hideSteppers id={`yearsus-${index}`} label="" {...field} />
                          )}
                        />
                      </td>

                      {/* Depreciación por Minuto */}
                      <td>{depPerMinute.toFixed(5)}</td>

                      <td>
                        <Controller
                          name={`equipmentCost.${index}.quantity`}
                          control={control}
                          render={({ field }) => (
                            <NumberInput hideSteppers id={`equ-quanti-${index}`} label="" {...field} />
                          )}
                        />
                      </td>

                      <td>
                        <Controller
                          name={`equipmentCost.${index}.timeMinutes`}
                          control={control}
                          render={({ field }) => (
                            <NumberInput hideSteppers id={`equip-times-${index}`} label="" {...field} />
                          )}
                        />
                      </td>
                      <td>{costUnit.toFixed(4)}</td>

                      <td>
                        <TrashCan size={16} onClick={() => remove(index)} />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className={styles['empty-state-container']}>
                    <NoContent title="No hay Equipamientos añadidos" message="Añada algunos Equipamientos" />
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
