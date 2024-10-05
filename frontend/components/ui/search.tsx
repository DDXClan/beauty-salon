import '@/styles/search.css';
import Image from 'next/image';


const Search = () => {
    return ( 
        <div className="all__search">
            <div className="search-container">
                <Image src="search.svg" className='search-icon' width={18} height={18} alt="search"/>
                <input className='search-input' type="text" placeholder="Поиск" />
            </div>
        </div>
     );
}
 
export default Search;