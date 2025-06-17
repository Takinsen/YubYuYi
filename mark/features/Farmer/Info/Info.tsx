type InfoProps = {
  id: string;
};

export default function Info({ id }: InfoProps) {
  return (
    <div>
      <h1>Farmer Info</h1>
      <p>Scanned ID: {id}</p>
    </div>
  );
}
