type NavLinkProps = {
  link?: string;
  children: React.ReactNode;
};
const NavLink = ({ children }: NavLinkProps) => {
  return (
    <li className='p-2 pl-5 hover:bg-slate-300 hover:text-slate-900'>
      <a>{children}</a>
    </li>
  );
};

export default NavLink;
