import React from 'react';
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form';
import { CostStructureFormValues } from '../schema/costructure-schema';
import { Button, NumberInput, Select, SelectItem, TextInput } from '@carbon/react';
import { Add, TrashCan } from '@carbon/react/icons';
import useGetSupply from '../../../hooks/use-get-supply';
import { calculateStandarCostSupply, calculateUnitCostSupply } from '../../../utils/supply';
import styles from './tabs.styles.scss';
import NoContent from '../../ui/NoContent/NoContent';
interface Props {
  form: UseFormReturn<CostStructureFormValues>;
}

export default function SupplyTab({ form }: Props) {
  const { control, setValue, watch } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'supplyCost',
  });
  const { supply, isLoading } = useGetSupply();
  const supplyData = watch('supplyCost');

  const handleCreateRow = () => {
    append({
      adquisitionPrice: 0,
      equivalence: 0,
      quantityUsed: 0,
      supplyId: 0,
      unitAcquisition: '',
      unitConsumption: '',
      name: 'Sin seleccionar',
      type: '',
      unitCost: 0,
    });
  };

  if (isLoading) return <div>dsadas</div>;
  return (
    <section className={styles['tab-container']}>
      <div>
        <div className="cds--col">
          <h4 className="cds--heading-04">Insumos y Medicamentos</h4>
        </div>
        <div className="cds--col" style={{ textAlign: 'right' }}>
          <Button kind="primary" size="md" onClick={handleCreateRow}>
            <Add size={16} />
            Agregar Insumo
          </Button>
        </div>
      </div>
      {/* Tabla editable */}
      <div className="cds--row">
        <div className="cds--col cds--spacing-03">
          <table className="cds--data-table cds--data-table--compact cds--data-table--zebra">
            <thead>
              <tr>
                <th>Insumos y Materiales</th>
                <th>Unidad de Adquisición</th>
                <th>Unidad de Consumo</th>
                <th>Equivalencia de consumo</th>
                <th>Precio de Adquisición</th>
                <th>Costo Unitario (S/.)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {fields.length > 0 ? (
                fields.map((row, index) => {
                  return (
                    <tr key={row.id}>
                      <td>
                        <Controller
                          name={`supplyCost.${index}.supplyId`}
                          control={control}
                          render={({ field }) => (
                            <Select
                              id=""
                              key={row.id}
                              {...field}
                              labelText=""
                              onChange={(e) => {
                                const id = e.target.value;
                                field.onChange(id);

                                const selectedSupply = supply.find((sup) => sup.id === Number(id));

                                if (selectedSupply) {
                                  setValue(`supplyCost.${index}.unitAcquisition`, selectedSupply.unitAcquisition);
                                  setValue(`supplyCost.${index}.unitConsumption`, selectedSupply.unitConsumption);
                                  setValue(`supplyCost.${index}.equivalence`, selectedSupply.equivalence);
                                  setValue(`supplyCost.${index}.name`, selectedSupply.name);
                                  setValue(`supplyCost.${index}.type`, selectedSupply.supplyType);
                                  const adquisitionPrice = watch(`supplyCost.${index}.adquisitionPrice`);
                                  const costUnit = calculateUnitCostSupply(
                                    adquisitionPrice,
                                    selectedSupply.equivalence,
                                  );
                                  setValue(`supplyCost.${index}.unitCost`, costUnit);
                                }
                              }}
                            >
                              <SelectItem text="Seleccione Insumo o Medicamento" value="" />
                              {supply.map((sup) => (
                                <SelectItem key={sup.id} text={sup.name} value={sup.id} />
                              ))}
                            </Select>
                          )}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`supplyCost.${index}.unitAcquisition`}
                          control={control}
                          render={({ field }) => (
                            <TextInput
                              readOnly
                              labelText=""
                              id={`unitAcquisition-${index}`}
                              value={field.value}
                              {...field}
                            />
                          )}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`supplyCost.${index}.unitConsumption`}
                          control={control}
                          render={({ field }) => (
                            <TextInput
                              readOnly
                              labelText=""
                              id={`unitConsumption-${index}`}
                              value={field.value}
                              {...field}
                            />
                          )}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`supplyCost.${index}.equivalence`}
                          control={control}
                          render={({ field }) => (
                            <NumberInput
                              readOnly
                              hideSteppers
                              id={`equivalence-${index}`}
                              value={field.value}
                              {...field}
                            />
                          )}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`supplyCost.${index}.adquisitionPrice`}
                          control={control}
                          render={({ field }) => (
                            <NumberInput
                              hideSteppers
                              id={`adquisitionPrice-${index}`}
                              value={field.value}
                              {...field}
                              onChange={(e) => {
                                const value = Number(e.currentTarget.value);
                                field.onChange(value);

                                const eq = supplyData[index].equivalence;
                                const unitCost = calculateUnitCostSupply(value, eq);

                                setValue(`supplyCost.${index}.unitCost`, unitCost);
                              }}
                            />
                          )}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`supplyCost.${index}.unitCost`}
                          control={control}
                          render={({ field }) => (
                            <NumberInput
                              hideSteppers
                              readOnly
                              id={`unitCost-${index}`}
                              value={field.value}
                              {...field}
                            />
                          )}
                        />
                      </td>
                      <td>
                        <TrashCan size={16} onClick={() => remove(index)} />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className={styles['empty-state-container']}>
                    <NoContent title="No hay insumos añadidos" message="Añada algunos insumos o medicamentos" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="cds--row">
        <div className="cds--col cds--spacing-03">
          <table className="cds--data-table cds--data-table--compact cds--data-table--zebra">
            <thead>
              <tr>
                <th>Insumos y Materiales</th>
                <th>Tiempo (minutos)</th>
                <th>Cantidad</th>
                <th>Costo Unitario</th>
                <th>Costo Estandar (S/.)</th>
              </tr>
            </thead>
            <tbody>
              {supplyData && supplyData.length > 0 ? (
                supplyData.map((sup, index) => {
                  return (
                    <tr key={index}>
                      <td>{sup.name}</td>
                      <td>
                        <Controller
                          name={`supplyCost.${index}.timeMinutes`}
                          control={control}
                          render={({ field }) => (
                            <NumberInput hideSteppers id={`timeMinutes-${index}`} value={field.value} {...field} />
                          )}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`supplyCost.${index}.quantityUsed`}
                          control={control}
                          render={({ field }) => (
                            <NumberInput hideSteppers id={`quantityUsed-${index}`} value={field.value} {...field} />
                          )}
                        />
                      </td>
                      <td>{sup.unitCost}</td>
                      <td>{calculateStandarCostSupply(sup.unitCost, sup.quantityUsed, sup.timeMinutes).toFixed(2)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className={styles['empty-state-container']}>
                    <NoContent title="No hay insumos añadidos" message="Añada algunos insumos o medicamentos" />
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
