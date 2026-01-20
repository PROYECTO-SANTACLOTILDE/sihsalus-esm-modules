import React, { useState, useEffect } from 'react';
import { useConfig, showSnackbar } from '@openmrs/esm-framework';
import { InlineLoading } from '@carbon/react';
import type { Config } from '../config-schema';
import styles from './fua-viewer-page.scss';

const FuaViewerPage: React.FC = () => {
  const config = useConfig<Config>();
  const endpoint = config.fuaGeneratorEndpoint;
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Error al cargar el contenido: ${response.status} ${response.statusText}`);
        }

        const html = await response.text();
        setHtmlContent(html);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido al cargar el contenido';
        setError(errorMessage);
        console.error('Error fetching FUA HTML:', err);
        showSnackbar({
          title: 'Error al cargar FUA',
          subtitle: errorMessage,
          kind: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHtml();
  }, [endpoint]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <InlineLoading description="Cargando visor de FUA..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3>⚠️ Error al cargar el visor de FUA</h3>
        <p>{error}</p>
        <details>
          <summary>Información técnica</summary>
          <p><strong>Endpoint:</strong> {endpoint}</p>
          <p><strong>Posibles causas:</strong></p>
          <ul>
            <li>El servidor no está respondiendo</li>
            <li>Políticas CORS bloqueando la conexión</li>
            <li>El endpoint configurado es incorrecto</li>
          </ul>
          <p><strong>Soluciones:</strong></p>
          <ul>
            <li>Verifica que el servidor esté funcionando</li>
            <li>Prueba el endpoint directamente en tu navegador</li>
            <li>Contacta al administrador del sistema</li>
          </ul>
        </details>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <iframe
        srcDoc={htmlContent}
        title="Visor de FUA"
        className={styles.fullIframe}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
      />
    </div>
  );
};

export default FuaViewerPage;
