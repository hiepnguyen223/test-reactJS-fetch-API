import {useState, useRef} from 'react';
import PropTypes from 'prop-types';

SearchForm.propTypes = {
    onSubmit: PropTypes.func
};

SearchForm.defaultProps = {
    onSubmit: null
}

function SearchForm( {onSubmit} ) {

    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeoutRef = useRef(null);

    function handleSearchForm (e) {

        if(!onSubmit) return

        const value = e.target.value;
        setSearchTerm(value);
        
        if(typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout( () => {
            onSubmit (value);
        }, 300)
    }

    return (
        <div>
            <input 
            type="text"
            
            onChange = {handleSearchForm}
            
             >
                
            </input>
        </div>
    );
}

export default SearchForm;