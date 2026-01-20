import React, { useState, useEffect } from 'react';
import { InlineLoading } from '@carbon/react';
import { showSnackbar, useConfig } from '@openmrs/esm-framework';
import styles from './fua-html-viewer.scss';
import type { Config } from '../config-schema';

interface FuaHtmlViewerProps {
  fuaId?: string;
  endpoint?: string;
}

const FuaHtmlViewer: React.FC<FuaHtmlViewerProps> = ({ fuaId, endpoint }) => {
  const config = useConfig<Config>();
  const fuaEndpoint = endpoint || config.fuaGeneratorEndpoint;
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFuaHtml = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Construir URL con parámetros si es necesario
        const url = fuaId ? `${fuaEndpoint}?fuaId=${fuaId}` : fuaEndpoint;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error al cargar el FUA: ${response.status}`);
        }

        const html = await response.text();
        setHtmlContent(html);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        showSnackbar({
          title: 'Error',
          subtitle: errorMessage,
          kind: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFuaHtml();
  }, [fuaId, fuaEndpoint]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <InlineLoading description="Cargando documento FUA..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>No se pudo cargar el documento FUA</p>
        <p className={styles.errorMessage}>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <iframe
        srcDoc={htmlContent}
        title="Documento FUA"
        className={styles.iframe}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
};

export default FuaHtmlViewer;
