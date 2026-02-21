import { Type } from '@openmrs/esm-framework';

/**
 * Esquema Nacional de Vacunación — NTS N.° 196-MINSA/DGIESP-2022
 * (RM 884-2022, modificada por RM 218-2024)
 *
 * Sequence convention: doses [1…9], boosters [11…19].
 * CIEL concept UUIDs follow the pattern {CIEL_ID}AAAAAAAAAAAAAAA…
 * Adjust UUIDs to match the concepts loaded on your OpenMRS server.
 */
export const configSchema = {
  immunizationConceptSet: {
    _type: Type.String,
    _default: 'CIEL:984',
    _description: 'A UUID or concept mapping which will have all the possible vaccines as set-members.',
  },
  sequenceDefinitions: {
    _type: Type.Array,
    _elements: {
      _type: Type.Object,
      vaccineConceptUuid: {
        _type: Type.UUID,
        _description: 'The UUID of the individual vaccine concept',
      },
      sequences: {
        _type: Type.Array,
        _elements: {
          _type: Type.Object,
          sequenceLabel: {
            _type: Type.String,
            _description: 'Name of the dose/booster/schedule.. This will be used as a translation key as well.',
          },
          sequenceNumber: {
            _type: Type.Number,
            _description:
              'The dose number in the vaccines. Convention for doses is [1...9] and for boosters is [11...19]',
          },
        },
      },
    },
    _description:
      'Doses/Schedules definitions for each vaccine configured if applicable. If not provided the vaccine would be treated as a vaccine without schedules',
    _default: [
      // ── BCG (RN) — 1 dosis única ──
      {
        vaccineConceptUuid: '886AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        sequences: [{ sequenceLabel: 'Dosis-Única', sequenceNumber: 1 }],
      },
      // ── Hepatitis B (HvB) — RN (primeras 24 h) ──
      {
        vaccineConceptUuid: '782AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        sequences: [{ sequenceLabel: 'Dosis-RN', sequenceNumber: 1 }],
      },
      // ── Pentavalente (DPT-HvB-Hib) — 2m, 4m, 6m ──
      {
        vaccineConceptUuid: '1685AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        sequences: [
          { sequenceLabel: '1.ª Dosis', sequenceNumber: 1 },
          { sequenceLabel: '2.ª Dosis', sequenceNumber: 2 },
          { sequenceLabel: '3.ª Dosis', sequenceNumber: 3 },
        ],
      },
      // ── IPV (Polio Inactivada) — 2m, 4m, 6m + refuerzo 18m ──
      {
        vaccineConceptUuid: '783AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        sequences: [
          { sequenceLabel: '1.ª Dosis', sequenceNumber: 1 },
          { sequenceLabel: '2.ª Dosis', sequenceNumber: 2 },
          { sequenceLabel: '3.ª Dosis', sequenceNumber: 3 },
          { sequenceLabel: 'Refuerzo', sequenceNumber: 11 },
        ],
      },
      // ── Rotavirus — 2m, 4m ──
      {
        vaccineConceptUuid: '83531AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        sequences: [
          { sequenceLabel: '1.ª Dosis', sequenceNumber: 1 },
          { sequenceLabel: '2.ª Dosis', sequenceNumber: 2 },
        ],
      },
      // ── Neumococo (PCV) — 2m, 4m + refuerzo 12m ──
      {
        vaccineConceptUuid: '162342AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        sequences: [
          { sequenceLabel: '1.ª Dosis', sequenceNumber: 1 },
          { sequenceLabel: '2.ª Dosis', sequenceNumber: 2 },
          { sequenceLabel: 'Refuerzo', sequenceNumber: 11 },
        ],
      },
      // ── Influenza pediátrica — 7m, 8m (anual) ──
      {
        vaccineConceptUuid: '5261AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        sequences: [
          { sequenceLabel: '1.ª Dosis', sequenceNumber: 1 },
          { sequenceLabel: '2.ª Dosis', sequenceNumber: 2 },
        ],
      },
      // ── SPR (Sarampión, Paperas, Rubéola) — 12m + refuerzo 18m ──
      {
        vaccineConceptUuid: '36AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        sequences: [
          { sequenceLabel: '1.ª Dosis', sequenceNumber: 1 },
          { sequenceLabel: 'Refuerzo', sequenceNumber: 11 },
        ],
      },
      // ── Varicela — 12m (1 dosis) ──
      {
        vaccineConceptUuid: '5859AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        sequences: [{ sequenceLabel: 'Dosis-Única', sequenceNumber: 1 }],
      },
      // ── Fiebre Amarilla (AMA) — 15m (1 dosis) ──
      {
        vaccineConceptUuid: '5864AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        sequences: [{ sequenceLabel: 'Dosis-Única', sequenceNumber: 1 }],
      },
      // ── DPT (refuerzo) — 18m + 2.° refuerzo 4a ──
      {
        vaccineConceptUuid: '781AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        sequences: [
          { sequenceLabel: '1.er Refuerzo', sequenceNumber: 11 },
          { sequenceLabel: '2.° Refuerzo', sequenceNumber: 12 },
        ],
      },
      // ── APO (Polio Oral bivalente) — refuerzo 4a ──
      {
        vaccineConceptUuid: '784AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        sequences: [{ sequenceLabel: 'Refuerzo', sequenceNumber: 11 }],
      },
    ],
  },
};

export interface ImmunizationConfigObject {
  immunizationConceptSet: string;
  sequenceDefinitions: Array<{
    vaccineConceptUuid: string;
    sequences: Array<{
      sequenceLabel: string;
      sequenceNumber: number;
    }>;
  }>;
}
