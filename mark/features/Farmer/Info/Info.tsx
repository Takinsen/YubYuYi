'use client';
import React from 'react'
import { useSearchParams } from 'next/navigation';

const Info = () => {
  const params = useSearchParams();
  const id = params.get('id');  // the scanned ID

  // now you can fetch the farmer or item by `id`
  // e.g. useEffect(() => fetchData(id), [id]);

  return (
    <div>
      <h1>Farmer Info</h1>
      <p>Scanned ID: {id}</p>
      {/* render details based on `id` */}
    </div>
  );
}

export default Info