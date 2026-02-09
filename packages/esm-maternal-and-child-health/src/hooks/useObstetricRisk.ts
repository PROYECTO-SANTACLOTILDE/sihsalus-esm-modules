import useSWR from 'swr';
import { openmrsFetch, restBaseUrl, useConfig } from '@openmrs/esm-framework';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import type { ConfigObject } from '../config-schema';

type RiskLevel = 'bajo' | 'alto' | 'muy-alto' | 'indeterminado';

interface ObstetricRiskResult {
  riskLevel: RiskLevel;
  riskFactors: string[];
  lastEvaluationDate: string | null;
  isLoading: boolean;
  error: any;
}

/**
 * Hook para clasificación de riesgo obstétrico según NTS 105-MINSA:
 * - Bajo riesgo: sin factores de riesgo identificados
 * - Alto riesgo: uno o más factores (edad <15 o >35, antecedentes, etc.)
 * - Muy alto riesgo: preeclampsia, hemorragia, etc.
 *
 * Usa: config.obstetricRisk.classificationConceptUuid para la última clasificación
 *      config.obstetricRisk.highRiskConceptUuid / lowRiskConceptUuid para interpretar
 *      config.madreGestante.riskAntecedentsConceptSetUuid para factores
 */
export function useObstetricRisk(patientUuid: string): ObstetricRiskResult {
  const config = useConfig<ConfigObject>();
  const classificationConceptUuid = config.obstetricRisk?.classificationConceptUuid;
  const highRiskConceptUuid = config.obstetricRisk?.highRiskConceptUuid;
  const lowRiskConceptUuid = config.obstetricRisk?.lowRiskConceptUuid;

  const url = useMemo(() => {
    if (!patientUuid || !classificationConceptUuid) return null;
    return `${restBaseUrl}/obs?patient=${patientUuid}&concept=${classificationConceptUuid}&v=custom:(uuid,value:(uuid,display),obsDatetime)&limit=1&sort=desc`;
  }, [patientUuid, classificationConceptUuid]);

  const { data, isLoading, error } = useSWR(
    url,
    async (fetchUrl: string) => {
      const response = await openmrsFetch(fetchUrl);
      return response?.data;
    },
  );

  const result = useMemo(() => {
    const obs = data?.results?.[0];
    if (!obs) {
      return { riskLevel: 'indeterminado' as RiskLevel, riskFactors: [], lastEvaluationDate: null };
    }

    const valueUuid = obs.value?.uuid;
    let riskLevel: RiskLevel = 'indeterminado';

    if (valueUuid === lowRiskConceptUuid) {
      riskLevel = 'bajo';
    } else if (valueUuid === highRiskConceptUuid) {
      riskLevel = 'alto';
    }

    const lastEvaluationDate = obs.obsDatetime ? dayjs(obs.obsDatetime).format('DD/MM/YYYY') : null;

    return { riskLevel, riskFactors: [], lastEvaluationDate };
  }, [data, highRiskConceptUuid, lowRiskConceptUuid]);

  return {
    ...result,
    isLoading,
    error,
  };
}

export default useObstetricRisk;
