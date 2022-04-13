// import React from "react";
// import PropTypes from "prop-types";
// import ScrollToTop from "./ScrollToTop";

// Pagination.propTypes = {
//     pagination: PropTypes.object.isRequired,
//     onPageChange: PropTypes.func,
// }

// Pagination.defaultProps = {
//     onPageChange: null,
// }


// function Pagination(props) {

//     const { pagination, onPageChange } = props;
//     const { page, pageSize, count } = pagination;
//     const totalPages = Math.ceil(count / pageSize)// ví dụ 51 item chia 10 ra 6 trang
//     const pageNumbers = [];

//     for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//     }

//     function handlePageChange(newPage) {
//         if (onPageChange) {
//             onPageChange(newPage);
//         }

//     }

//     return (

//         <div className="flex  space-x-24   clear-left  h-full items-center  justify-center">
//             <button className="flex items-center px-4 py-2 text-xanhla"
//                 disabled={page <= 1}
//                 onClick={() => handlePageChange(page - 1)}
//             >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
//                 </svg>
//             </button>
//             <div className="py-2  text-xanhla mx-auto text-center justify-center">
//                 <ul className="flex gap-x-12">
//                     {
//                         pageNumbers.map(number => {
//                             return <li  className={page == number ? "bg-xanhla -ml-2 text-white rounded-full  h-8 -mt-1 p-1 w-8 " : " -ml-2 text-black rounded-full h-8 -mt-1 p-1 w-8"} key={number}>
//                               <a className="cursor-pointer" onClick={() => handlePageChange(number)}>  {number}</a>
//                             </li>
//                         })
//                     }
//                 </ul>
//             </div>
//             <button className="px-4 py-2 text-xanhla"
//                 disabled={page >= totalPages}
//                 onClick={() => handlePageChange(page + 1)}
//             >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                 </svg>
//             </button>
//         </div>




//     );

// }
// export default Pagination;
import React from "react";


const Pagination = ({ postsPerPage, totalPosts, onPageChange, currentPage }) => {
    const pageNumbers = [];
    // const {  onPageChange } = props;
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
                  
    }
        function handlePageChange(newPage) {
        if (onPageChange) {
            onPageChange(newPage);
        }
    }
    return (
        <nav>
            <ul>


                <div className="flex  space-x-24   clear-left  h-full items-center  justify-center">
                    <button className="flex items-center px-4 py-2 text-xanhla"
                    disabled={currentPage <= 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                    </button>
                    <div className="py-2  text-xanhla mx-auto text-center justify-center">
                        <ul className="flex gap-x-12">
                            {
                                pageNumbers.map(number => {
                                    return <li className={ currentPage === number ? "bg-xanhla -ml-2 text-white rounded-full  h-8 -mt-1 p-1 w-8 " : " -ml-2 text-black rounded-full h-8 -mt-1 p-1 w-8"} key={number}>
                                        <a className="cursor-pointer" onClick={() => handlePageChange(number)}> {number}  </a>          
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    <button className="px-4 py-2 text-xanhla"
                    disabled={currentPage >= pageNumbers.length}
                    onClick={() => handlePageChange(currentPage + 1)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </div>


            </ul>
        </nav>
    );
}
export default Pagination;