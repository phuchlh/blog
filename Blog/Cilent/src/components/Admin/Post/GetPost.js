
import React, { Component, useState, useEffect, useContext, Fragment } from "react";
import PropTypes from 'prop-types';
import Modal from "../../Modal";
import ModalFotPost from "./ModalFotPost";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
GetPost.propTypes = {
    posts: PropTypes.array,
    user: PropTypes.array,
};
GetPost.defaultProps = {
    posts: [{}],
    user: [{}],
};
function GetPost(props) {
    const { posts } = props;
    const { user } = props;


    const [show, setShow] = useState(false);
    const [isClicked, setIsClicked] = useState(true);
    const [selectedUser, setselectedUser] = useState(undefined)
    const [name, setName] = useState("")
    const [status, setStatus] = useState("")
    const [selectedName, setselectedName] = useState(undefined)

    function showModal(accountData, userName, specData) {
        setselectedUser(accountData)
        setselectedName(userName)
        setShow(true);
        setIsClicked(true);
    };
    function hideModal() {
        setShow(false);
        setIsClicked(false);
    };

    useEffect(() => {
        if (!show) {
            setselectedUser(undefined)
            setselectedName(undefined)
        }
    }, [show])


    const callbackFunction = (childData) => {

        { props.parentCallback(childData) }
    };
   

    async function deletePost(data) {
        if (data?.status == "ACTIVE") {
            setStatus("INACTIVE")
        } else {
            setStatus("ACTIVE")
        }

        const body = {
            id: data?.id,
            idAccount: data?.idAccount,
            status: (data?.status == "ACTIVE" ? "INACTIVE" : "ACTIVE")
        };

      
        const res = await fetch(`http://127.0.0.1:8000/post/delete_post`, {
            method: `PUT`,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
            .then(result => {
                props.onDelete()
                props.parentCallback("Change Status successfully");
            })
            .catch((error) => {
                throw ('Invalid Token')
            })
        return body
    }

    return (


        <tbody className="text-left h-16 ">
            {posts.map((post, index) => {
                return (

                    <tr className="h-16 border-b-2 border-gray-200 " key={post.id}>

                        <td className="pl-8">  {(index + 1) + ((props?.currentPage - 1) * (props?.postsPerPage))} </td>
                        <td>{post?.title}</td>
                        <td className="">{user.map((userName, index) => {
                            if (userName?.id == post?.idAccount) {

                                return <option key={userName?.index}   >  {userName?.username}</option>

                            }
                        })}</td>

                        <td className="">{post?.status == "ACTIVE" ? "Active" : "Inactive"} </td>
                        <td className="  ">


                            <button type="button" className="font-bold" onClick={() => showModal(post.id, user)}>

                                <RemoveRedEyeIcon />
                            </button>

                            <button type="button" className="font-bold ml-12 " onClick={() => deletePost(post)}>
                    
                         {post?.status == "ACTIVE" ?  <PublicIcon /> : <PublicOffIcon /> }      
                            </button>

                        </td>
                        {/* <th className="  ">Delete</th> */}
                    </tr>

                )
            })}
            <Modal show={show} handleClose={hideModal} className="mb-5">
                <ModalFotPost role={selectedUser} nameUser={selectedName} setIsClicked={isClicked} parentCallback={callbackFunction} onModal={() => setShow(false)} onUpdate={() => props.onDelete()} />
            </Modal>

        </tbody>


    );

}

export default GetPost;