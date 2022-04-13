import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

Search.propTypes = {
    onSubmit: PropTypes.func,
};

Search.defaultProps = {
    onSubmit: null,
}

function Search(props) {

   
    const { onSubmit } = props;
    const [searchTerm, setSearchTerm] = useState('');
    props.parentCallback(searchTerm)
    const typingTimeoutRef = useRef(null);

    function handleSearchTermChange(e) {
        const value = e.target.value;
        setSearchTerm(value);

        if (!onSubmit) return;
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        };

        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value,
            };
            onSubmit(formValues);
        }, 2000);

    }

    return (
        <div>
            <form >
                {/* <input type="text"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    placeholder="Search..."
                    className="border-2 rounded-lg float-right mr-16 mb-10 border-xanhla w-64  my-auto outline-none p-5 h-10   mt-5"
                /> */}
                 <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField 
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    id="outlined-basic" label="Search..." variant="outlined" />
                </Box>



            </form>
        </div>
    )
}
export default Search;