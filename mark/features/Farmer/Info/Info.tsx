type InfoProps = {
  id: string;
};

import getDurianGuest from "@/api/durian/getDurianGuest";

export default async function Info({ id }: InfoProps) {
  const data = await getDurianGuest( id, 'en' );

  return (
    <div>
      <h1>Farmer Info</h1>
      <p>Scanned ID: {id}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
