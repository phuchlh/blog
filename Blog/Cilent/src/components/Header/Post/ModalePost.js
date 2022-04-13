import React, { Component, useState, useEffect, useContext } from "react";
import Logo from '../../image/logo.png'
import { Link, NavLink, useHistory } from 'react-router-dom'
export default function ModalePost(props) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorBE, setErrorBE] = useState("");
    const validAll = new RegExp("(?=.{6,10000}$)");
    const validTitle = new RegExp("(?=.{6,30}$)");

   
    useEffect(() => {
        if (props?.data) {
            setTitle(props?.data?.title);
            setContent(props?.data?.content)
            setImage(props?.data?.image)
        } else {
            setTitle("");
            setContent("")
            setImage("")
        }
    }, [props?.data?.title, props?.data?.content, props?.data?.image])

    async function updatePost() {
        if (!validAll.test(title) && !validAll.test(content) && !validAll.test(image)) {

        } else {

            const body = {
                id: props?.data?.id,
                title: title,
                content: content,
                image: image,
                idAccount: localStorage.getItem('id-token'),

            };
          
            const res = await fetch(`http://127.0.0.1:8000/post/update_list`, {
                method: `PUT`,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(result => {

                    if (result) {
                        
                        props.onModal()
                        props.onDelete()
                        props.parentCallback("Update Successfully");
                    } else {
                        alert("update thất bại")
                    }
                    return res

                })
                .catch((error) => {
                    throw ('Invalid Token')
                })
            return body
        }
    }

    async function createPost() {
        if (!validTitle.test(title) && !validAll.test(content) && !validAll.test(image)) {
            setErrorBE("")
            setError(true)
            setErrorName(false)
        }
        else {
            setErrorName(false)
            setError(false)
            const body = {
                title: title,
                content: content,
                image: image,
                idAccount: localStorage.getItem('id-token'),
            };
            let res = await fetch("http://127.0.0.1:8000/post/post_list", {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
                body: JSON.stringify(body)

            }).then(res => res.json())
                .then(result => {
                    if (result?.resultCode == 1) {
                        props.onModal()
                        // props.onDelte()
                        props.parentCallback("Create successfully");
                    }
                    else {
                        setErrorBE(result?.mess)
                    }
                })
                .catch((error) => {
                    throw ('Invalid Token')
                })
            return body
        }
    }
    return (
        <div className="clear-both mb-0 ">
            <div className="border-b-2 mb-5 border-gray-400">
                <Link to="/"><img src={Logo} alt="logo" className="float-left w-64 h-24 pr-2" /></Link>
                <div className="">
                    <h2 className=" text-3xl font-bold  text-black pt-2">  Blog Detail </h2>
                    <p className="text-gray-500 pb-2 pl-2 pr-24">You can create Blog Yourself And you can add image</p>
                </div>
            </div>
            <div className=" mx-16 text-black  text-2xl">
                {errorBE !== "" && <div className='text-red-600 ml-11 mb-5 text-xl'>{errorBE}</div>}
                {error && <div className='text-red-600 ml-11 mb-5 text-xl'>All information is not short more 6 character </div>}
                {errorName && <div className='text-red-600 ml-11 mb-5 text-xl'>Title is not short more 6 character and more 30</div>}
                <table className="text-gray-500">
                    <tbody >
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> Title<i className="text-red-600">*</i> :  </th>
                            <td><input className="font-normal pl-10 text-gray-900 outline-none " placeholder="Input Title..." value={title}
                                onChange={e => setTitle(e.target.value)}
                            /></td>
                        </tr>
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> Image <i className="text-red-600">*</i> :  </th>
                            <td><input className="font-normal pl-10 text-gray-900 outline-none " placeholder="Choose Image..." value={image}
                                onChange={e => setImage(e.target.value)}
                            /></td>
                        </tr>
                        <tr className=" h-50  ">
                            <th className="text-left pb-85  "> Content <i className="text-red-600">*</i> :  </th>
                            <td className="pt-3"><textarea className="font-normal h-32 w-full resize-none pl-10  text-gray-900 outline-none " placeholder="Input Content..."
                                onChange={e => setContent(e.target.value)} value={content}
                            /></td>
                        </tr>

                    </tbody>
                </table>



            </div>
            <div className=" cursor-pointer w-full h-14 leading-56 text-4xl text-center  float-right bg-black hover:text-black hover:bg-blue-500 text-red-50"  >
                {props?.data === undefined ? <p onClick={createPost}>Create</p> : <p onClick={updatePost}>Update</p>}
            </div>


        </div>




    )

}
