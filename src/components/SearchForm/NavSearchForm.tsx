import React, { useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
type NavSearchFormProps = {
  onSubmit: (text: string) => void;
};
const NavSearchForm = (props: NavSearchFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    inputRef.current && props.onSubmit(inputRef.current.value);
  };

  return (
    <form
      className='flex flex-1 flex-row items-center gap-3 py-2 px-3 text-base'
      onSubmit={handleSubmit}
    >
      <button
        type='submit'
        className='text-gray-500 hover:text-gray-700'
      >
        <FaSearch />
      </button>
      <input
        autoFocus={true}
        required
        type='text'
        ref={inputRef}
        className='flex-1 text-gray-900 outline-none'
        placeholder='Search token name or exchange'
      />
    </form>
  );
};

export default NavSearchForm;
