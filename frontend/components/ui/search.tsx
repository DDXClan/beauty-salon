import React from 'react';
import Image from 'next/image';
import '@/styles/search.css';

type SearchProps = {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const Search: React.FC<SearchProps> = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="all__search">
            <div className="search-container">
                <Image src="search.svg" className='search-icon' width={18} height={18} alt="search" />
                <input
                    className='search-input'
                    type="text"
                    placeholder="Поиск"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>
        </div>
    );
};

export default Search;
