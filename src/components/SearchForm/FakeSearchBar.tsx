import { FaSearch } from 'react-icons/fa';

type FakeSearchBarProps = {
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
};
const FakeSearchBar = (props: FakeSearchBarProps) => {
  const { onClick } = props;
  return (
    <div
      className='flex h-[35px] w-[12rem] cursor-pointer flex-row items-center justify-start rounded-md border border-gray-200 bg-gray-300 px-2 py-2 text-[1rem] text-gray-500 hover:text-gray-700'
      onClick={onClick}
    >
      <FaSearch />
      <div className='px-1'></div>
      <div className='flex-1 cursor-text select-none'>Search</div>
    </div>
  );
};
export default FakeSearchBar;
