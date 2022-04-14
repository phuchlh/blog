import { Link, NavLink } from 'react-router-dom';
import { default as React, useEffect, useState } from "react";
import Post from "./Post";
import Search from "./Search";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


export default function SearchPeople(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const [search, setSearch] = useState("");
    const [postList, setPostList] = useState([]);
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        featchUserList()

    }, [search]);
   

    const callbackSearch = (childData) => {
        setSearch(childData)

    };

    async function featchUserList() {
        try {

            let response = await fetch(`http://127.0.0.1:8000/auth/account/search?search=${search}`, {
                method: 'GET',
                headers: {
                    // 'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                }
            })
            const responseJSON = await response.json();
            
            const { data, pagination } = responseJSON;
            setUserList(responseJSON);

           
        } catch (error) {
         

        }

    }

      
    const filterList1 = userList.filter(user => {
        if (user?.id != localStorage.getItem('id-token')) {
            return user
        }
    })

console.log("filter search:", filterList1)

    return (
        <Post >
            <div className="float-right mr-12">
                <Search parentCallback={callbackSearch} />
            </div>

            {filterList1.map((user, index) => {
                return (
                    <List className="clear-both ml-64 " key={user.id} sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper' }}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar  > {user?.username?.slice(0, 2)}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    < NavLink
                                        activeStyle={{ color: '#2596be' }}
                                        to={{
                                            pathname: "/post/member/memberview",
                                            state: {
                                                name: user,
                                            }
                                        }} ><Typography variant="h5"  > {user?.username} </Typography></NavLink>
                                }
                                secondary={
                                    <React.Fragment>
                                       
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Email:
                                        </Typography>
                                        {user?.email}
                                        {"-----"}
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Phone:
                                        </Typography>
                                        {user?.phone !== null ? user?.phone : " People not Phone"}
                                        
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />

                    </List>
                )
            })}
        </Post>
    );
}  