type NavLinkProps = {
  title: string;
  value: string;
};
const CryptoStat = ({ title, value }: NavLinkProps) => {
  return (
    <div className="basis-1/5 flex-shrink-0">
      <h3 className="font-bold">{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default CryptoStat;
