import { ActionMenuButton, DocumentIcon, useWorkspaces } from '@openmrs/esm-framework';
import {
  formEntryWorkspace,
  htmlFormEntryWorkspace,
  launchPatientWorkspace,
  useLaunchWorkspaceRequiringVisit,
} from '@openmrs/esm-patient-common-lib';
import React, { type ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

const CREDFormActionButton: React.FC = () => {
  const { t } = useTranslation();
  const { workspaces } = useWorkspaces();
  const launchCREDFormsWorkspace = useLaunchWorkspaceRequiringVisit('cred-forms-workspace');

  const formEntryWorkspaces = workspaces.filter((w) => w.name === formEntryWorkspace);
  const recentlyOpenedForm = formEntryWorkspaces[0];

  const htmlFormEntryWorkspaces = workspaces.filter((w) => w.name === htmlFormEntryWorkspace);
  const recentlyOpenedHtmlForm = htmlFormEntryWorkspaces[0];

  const isFormOpen = formEntryWorkspaces?.length >= 1;
  const isHtmlFormOpen = htmlFormEntryWorkspaces?.length >= 1;

  const launchPatientWorkspaceCb = () => {
    if (isFormOpen) {
      launchPatientWorkspace(formEntryWorkspace, {
        workspaceTitle: recentlyOpenedForm?.additionalProps?.['workspaceTitle'],
      });
    }
    // We aren't currently supporting keeping HTML Form workspaces open, but just in case
    else if (isHtmlFormOpen) {
      launchPatientWorkspace(htmlFormEntryWorkspace, {
        workspaceTitle: recentlyOpenedHtmlForm?.additionalProps?.['workspaceTitle'],
      });
    } else {
      launchCREDFormsWorkspace();
    }
  };

  return (
    <ActionMenuButton
      getIcon={(props: ComponentProps<typeof DocumentIcon>) => <DocumentIcon {...props} />}
      label={t('credForms', 'Formularios CRED')}
      iconDescription={t('credForms', 'Formularios CRED')}
      handler={launchPatientWorkspaceCb}
      type={'cred-form'}
    />
  );
};

export default CREDFormActionButton;
