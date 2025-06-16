'use client';

import QrScanner from '@/components/Scanner/Scanner';

export default function Scan() {
  const handleScan = (id: string) => {
    console.log('Scanned ID:', id);
    // You can now fetch item details or navigate inside your app
  };

  return (
    <div>
      <h1>Scan QR Code</h1>
      <QrScanner onScan={handleScan} />
    </div>
  );
}
