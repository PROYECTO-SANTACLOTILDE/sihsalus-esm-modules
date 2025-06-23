import { createGlobalStore, useStore } from '@openmrs/esm-framework';
import { teeth as initialTeeth } from '../data/teethData.json';

interface DentalDataState {
  teeth: any[];
}

const dentalDataStore = createGlobalStore<DentalDataState>('dentalDataStore', {
  teeth: initialTeeth || [],
});

export const useDentalDataStore = () => useStore(dentalDataStore, (state) => state.teeth);

export const registerFinding = (params: any) => {
  dentalDataStore.setState((state) => {
    const { toothId, optionId, subOptionId, color, design } = params;
    const dynamicDesignValue = design?.number || null;

    const newFinding = {
      uniqueId: Math.floor(Math.random() * 1000000),
      optionId,
      subOptionId,
      color,
      dynamicDesign: dynamicDesignValue,
    };

    const updatedTeeth = state.teeth.map((tooth: any) => {
      if (tooth.id === toothId) {
        const updatedFindings = [...tooth.findings, newFinding];
        return { ...tooth, findings: updatedFindings };
      }
      return tooth;
    });

    return { teeth: updatedTeeth };
  });
};

export const removeFinding = (params: any) => {
  dentalDataStore.setState((state) => {
    const { toothId, optionId, subOptionId, dynamicDesign } = params;

    const updatedTeeth = state.teeth.map((tooth: any) => {
      if (tooth.id === toothId) {
        const updatedFindings = tooth.findings.filter(
          (f: any) =>
            !(
              f.optionId === optionId &&
              f.subOptionId === subOptionId &&
              (dynamicDesign === undefined || f.dynamicDesign === dynamicDesign)
            ),
        );
        return { ...tooth, findings: updatedFindings };
      }
      return tooth;
    });

    return { teeth: updatedTeeth };
  });
};

export default dentalDataStore;
