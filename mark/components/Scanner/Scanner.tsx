// Scanner.module.tsx
'use client';
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import style from './Scanner.module.css';

export interface QrScannerHandle {
  stopScanner: () => Promise<void>;
}

const CustomQrScanner = forwardRef<QrScannerHandle, { onScan(id: string): void }>(
  ({ onScan }, ref) => {
    const scannerRef = useRef<Html5Qrcode | null>(null);

    // expose stopScanner to parent
    useImperativeHandle(ref, () => ({
      stopScanner: async () => {
        if (!scannerRef.current) return;
        try {
          await scannerRef.current.stop();
          await scannerRef.current.clear();
        } catch (e) {
          console.warn('stopScanner error (ignored):', e);
        } finally {
          scannerRef.current = null;
        }
      },
    }));

    useEffect(() => {
      let didCancel = false;
      (async () => {
        if (didCancel) return;
        // Only run on secure context
        if (!window.isSecureContext) {
          console.warn('QR Scanner requires HTTPS or localhost.');
          return;
        }

        try {
          const cams = await Html5Qrcode.getCameras();
          if (didCancel || cams.length === 0) return;
          const back = cams.find((c) =>
            /back|environment/i.test(c.label)
          );
          const id = back?.id ?? cams[0].id;
          const qr = new Html5Qrcode('qr-reader');
          scannerRef.current = qr;

          await qr.start(
            id,
            { fps: 10, qrbox: undefined },
            (text) => {
              try {
                const url = new URL(text);
                const itemId = url.searchParams.get('id');
                if (itemId) onScan(itemId);
              } catch { /* not a URL: ignore */ }
            },
            (err) => {
              /* scan‑error: ignore or log */
            }
          );
        } catch (e) {
          console.warn('Could not start QR scanner (ignored):', e);
        }
      })();

      return () => {
        didCancel = true;
        if (scannerRef.current) {
          // swallow any errors
          scannerRef.current
            .stop()
            .then(() => scannerRef.current?.clear())
            .catch(() => {})
            .finally(() => {
              scannerRef.current = null;
            });
        }
      };
    }, [onScan]);

    return <div id="qr-reader" className={style.ScanContainer} />;
  }
);

export default CustomQrScanner;
