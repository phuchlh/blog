
import React, { Component, useState, useEffect, useContext, Fragment } from "react";
import PropTypes from 'prop-types';
import Modal from "../../Modal";
import ModalForUser from "./ModalForUser";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

GetAccount.propTypes = {
    posts: PropTypes.array,
};
GetAccount.defaultProps = {
    posts: [{}],
    postss: [{}],
};
function GetAccount(props) {
    const { posts } = props;
    const { postss } = props;
    const { spec } = props;
    
    const [show, setShow] = useState(false);
    const [isClicked, setIsClicked] = useState(true);
    const [selectedUser, setselectedUser] = useState(undefined)
    const [selectedRole, setselectedRole] = useState(undefined)
    const [selectedSpec, setselectedSpec] = useState(undefined)

    function showModal(accountData, roleData, specData) {
        setselectedUser(accountData)
        setShow(true);
        setIsClicked(true);
    };
     async function activeAccount(selectId, selecActive) {
           if(selecActive == true){
            const body = {
                id: selectId,
                is_active: "false"
            };
            
            const res = await fetch(`http://127.0.0.1:8000/auth/account/update_account_status`, {
                method: `PUT`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(result => {
                    props.parentCallback("Delete successfully", "success");
                    props.onDelete()
                })
                .catch((error) => {
                    throw ('Invalid Token')
                })
            return body
           }
         else{
            props.parentCallback("If you want active account, you can call Super Admin ", "warning");
            props.onDelete()
         }     
    };
    function hideModal() {
        setShow(false);
        setIsClicked(false);
    };

    useEffect(() => {
        if (!show) {
            setselectedUser(undefined)

        }
    }, [show])

    const callbackFunction = (childData) => {

        { props.parentCallback(childData) }
    };


    return (


        <tbody className="text-left h-16 ">
            {posts.map((post, index) => {
                return (

                    <tr className="h-16 border-b-2 border-gray-200 " key={post.id}>

                        <td className="pl-8">  {(index + 1) + ((props?.currentPage - 1) * (props?.postsPerPage))} </td>
                        <td>{post?.username}</td>
                        <td className="">{post?.email}</td>

                        <td className="">{post?.is_superuser == false ? "User" : "Admin"} </td>
                        <td className="  ">

                            <button type="button" className="font-bold" onClick={() => showModal(post.id)}>
                            <RemoveRedEyeIcon />
                            </button>
                            <button type="button" className="font-bold ml-12" onClick={() => activeAccount(post.id, post.is_active)}>
                            {post?.is_active == true ? <DeleteIcon /> : <DeleteForeverIcon /> }
                            </button>
                            </td>
                        {/* <th className="  ">Delete</th> */}
                    </tr>

                )
            })}
            <Modal show={show} handleClose={hideModal} className="mb-5">
                <ModalForUser role={selectedUser} setIsClicked={isClicked} parentCallback={callbackFunction} onModal={() => setShow(false)} onUpdate={() => props.onDelete()} />
            </Modal>

        </tbody>


    );

}

export default GetAccount;