type NavLinkProps = {
  title: string;
  value: string;
};
const CryptoStat = ({ title, value }: NavLinkProps) => {
  return (
    <div className='rounded border px-8 py-4 shadow-sm '>
      <h3 className='font-bold'>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default CryptoStat;
