'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

export default function CustomQrScanner({ onScan }: { onScan: (id: string) => void }) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const startScanning = async () => {
    const cameraId = (await Html5Qrcode.getCameras())[0]?.id;
    if (!cameraId) return alert('No camera found');

    const html5QrCode = new Html5Qrcode('qr-reader');
    scannerRef.current = html5QrCode;

    html5QrCode.start(
      cameraId,
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      (decodedText) => {
        try {
          const url = new URL(decodedText);
          const id = url.searchParams.get('id');
          if (id) {
            onScan(id);
            stopScanning();
          }
        } catch {
          console.warn('Scanned text is not a valid URL');
        }
      },
      (errorMessage) => {
        // Optional: handle scanning errors
        console.log('Scan error:', errorMessage);
      }
    );

    setIsScanning(true);
  };

  const stopScanning = () => {
    scannerRef.current?.stop().then(() => {
      scannerRef.current?.clear();
      setIsScanning(false);
    });
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div id="qr-reader" className="relative w-[300px] h-[300px] rounded-lg overflow-hidden border border-gray-300">
        {/* Optional custom overlay */}
        <div className="absolute inset-0 border-4 border-blue-500 rounded-md pointer-events-none" />
      </div>

      {!isScanning ? (
        <button
          onClick={startScanning}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Start Camera
        </button>
      ) : (
        <button
          onClick={stopScanning}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Stop Camera
        </button>
      )}
    </div>
  );
}
