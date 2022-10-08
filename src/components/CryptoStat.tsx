type NavLinkProps = {
  title: string;
  value: string;
};
const CryptoStat = ({ title, value }: NavLinkProps) => {
  return (
    <div className='flex-shrink-0 basis-1/5'>
      <h3 className='font-bold'>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default CryptoStat;
