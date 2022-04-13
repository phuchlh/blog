import queryString from 'query-string';
import { default as React, useEffect, useState } from "react";
import Admin from "../AdminDashboard/AdminDashboard";
import GetPost from './GetPost';
import Pagination from '../../Pagination';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '../../Modal';
import ModalFotPost from './ModalFotPost';
import Search from '../../Header/Post/Search';




const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function PostManagement(props) {
    const [message, setMessage] = useState('');
    const [userProfile, setUserProfile] = useState([]);
    const [postList, setpostList] = useState([]);
    const [user, setUser] = useState([]);
    
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
        count: 1,
    });
    const [show, setShow] = useState(false);
    const [isClicked, setIsClicked] = useState(true);
    const [selectedUser, setselectedUser] = useState(undefined)
    const [selectedRole, setselectedRole] = useState(undefined)
    const [selectedSpec, setselectedSpec] = useState(undefined)

    function showModal() {
       
        setShow(true);
        setIsClicked(true);
    };
    function hideModal() {
        setShow(false);
        setIsClicked(false);
    };

    useEffect(() => {
        if (!show) {
         
           
        }
    }, [show])


    const [filters, setFilters] = useState({
        page: 1,
        pageSize: 10,
        // title_like: '',
    })
    const [open, setOpen] = useState(false);
    useEffect(() => {
        featchPostList();
        setCurrentPage(1);
    }, [search]);
    useEffect(() => {
       
        featchUserList();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost)

    async function featchUserList() {
        try {
          
            const paramsString = queryString.stringify(filters);
            let response = await fetch(`http://127.0.0.1:8000/auth/account/search?search=`, {
                method: 'GET',
                headers: {
                    // 'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                }
            })
            const responseJSON = await response.json();
           
            const { data, pagination } = responseJSON;
            setUser(responseJSON);
            setPagination({
                page: filters.page,
                pageSize: 10,
                count: responseJSON?.data?.count,
            });
         
        } catch (error) {
            

        }

    }

    async function featchPostList() {
        try {
          
            let response = await fetch(`http://127.0.0.1:8000/post/search_by_title?search=${search}`, {
                method: 'GET',
                headers: {
                    // 'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                }
            })
            const responseJSON = await response.json();
           
            
            setpostList(responseJSON);
           
            
        } catch (error) {
        

        }

    }

    // function handlePageChange(newPage) {
    //     console.log('new page: ', newPage);
    //     setFilters({
    //         ...filters,
    //         page: newPage,
    //     })
    // }

    function handleSearchTermChange(newFilters) {
        setFilters({
            ...filters,
            page: 1,
            title_like: newFilters.searchTerm,
        })
    }

    const callbackFunction = (childData) => {
        setMessage(childData)
        setOpen(true)
    };
    const callbackSearch = (childData) => {
        
        if(childData != null){
            setSearch(childData)
           
        }
    };

   
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <Admin>

            <div className="mt-101">
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} className="float-left w-screen">
                    <Alert onClose={handleClose} severity="success" >
                        {message}
                    </Alert>
                </Snackbar>
                <div className="bg-white h-20 mx-5 grid  grid-cols-9 ">
                    <h2 className="text-xl 2xl:col-span-6 xl:col-span-5  lg:col-span-4 md:col-span-3 sm:col-span-2 col-span-1 leading-80 pl-8 float-left text-700 h-20">Post Manage</h2>
                    <div className="  mt-1 col-span-2   w-450">
                        
                        <Search parentCallback = {callbackSearch} />

                    </div>
                </div>
                <div className="mx-5 bg-white clear-none  ">
                    <table className="table-auto w-full   text-left">
                        <thead className=" h-10   bg-gray-200  ">
                            <tr className=" ">
                                <th className=" pl-8 w-32 "> No. </th>

                                <th className="w-96  "> Title</th>
                                <th className="w-96   ">Name Account</th>

                                <th className="w-96 ">Status</th>
                                <th className="  ">Actions</th>
                                <th className="  "></th>
                            </tr>
                        </thead>
                        <GetPost posts={currentPosts} currentPage={currentPage} postsPerPage={postsPerPage} parentCallback={callbackFunction} user={user} onDelete={() => featchPostList()} />



                    </table>
                    <div className="h-16  border-gray-200  ">


                        {/* <Pagination pagination={pagination} onPageChange={handlePageChange} /> */}
                        <Pagination postsPerPage={postsPerPage} currentPage={currentPage} onPageChange={handlePageChange} totalPosts={postList.length} />
                    </div>
                </div>

            </div>
        </Admin>
    )
}


export default PostManagement;