import queryString from 'query-string';
import { default as React, useEffect, useState } from "react";
import Admin from "../AdminDashboard/AdminDashboard";
import GetAccount from './GetAccount';
import Pagination from '../../Pagination';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '../../Modal';
import ModalForUser from './ModalForUser';
import Search from '../../Header/Post/Search';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function User(props) {
    const [message, setMessage] = useState('');
    const [userProfile, setUserProfile] = useState([]);
    const [postList, setpostList] = useState([]);
    const [postSpecList, setPostSpecList] = useState([]);
    const [search, setSearch] = useState("");
    const [alert, setAlert] = useState("");
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

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost)


    async function featchPostList() {
        try {
         
            const paramsString = queryString.stringify(filters);
            let response = await fetch(`http://127.0.0.1:8000/auth/account/search?search=${search}`, {
                method: 'GET',
                headers: {
                    // 'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                }
            })
            const responseJSON = await response.json();
          
            const { data, pagination } = responseJSON;
            setpostList(responseJSON);
            setPagination({
                page: filters.page,
                pageSize: 10,
                count: responseJSON?.data?.count,
            });
         
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

    const callbackFunction = (childData, alert) => {
        setMessage(childData)
        setAlert(alert)
        setOpen(true)
    };
    const callbackSearch = (childData) => {
        setSearch(childData)

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
                    <Alert onClose={handleClose} severity={alert} >
                        {message}
                    </Alert>
                </Snackbar>
                <div className="bg-white h-20 mx-5 grid  grid-cols-9 ">
                    <h2 className="text-xl 2xl:col-span-6 xl:col-span-5  lg:col-span-4 md:col-span-3 sm:col-span-2 col-span-1 leading-80 pl-8 float-left text-700 h-20">User manage</h2>
                    <div className="  mt-1 col-span-2   w-450">

                        <Search parentCallback={callbackSearch} />
                    </div>
                    {/* <Modal show={show} handleClose={hideModal} className="mb-5">
                        <ModalForUser parentCallback={callbackFunction} onDelteModal={() => setpostList(undefined)} onModal={() => setShow(false)} onDelete={() => featchPostList()} />
                    </Modal>
                    <div>
                        <button type="button" onClick={showModal} className="h-50 w-28 bg-xanhlot rounded-lg mt-4 text-white">Add new</button>

                    </div> */}
                </div>
                <div className="mx-5 bg-white clear-none  ">
                    <table className="table-auto w-full   text-left">
                        <thead className=" h-10   bg-gray-200  ">
                            <tr className=" ">
                                <th className=" pl-8 w-32 "> No. </th>

                                <th className="w-96  "> Name</th>
                                <th className="w-96   ">Email</th>

                                <th className="w-96 ">Role</th>
                                <th className="  ">Actions</th>
                                <th className="  "></th>
                            </tr>
                        </thead>
                        <GetAccount posts={currentPosts} currentPage={currentPage} postsPerPage={postsPerPage} parentCallback={callbackFunction} spec={postSpecList} onDelete={() => featchPostList()} />



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


export default User;