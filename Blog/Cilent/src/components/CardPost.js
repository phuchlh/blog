import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, NavLink } from 'react-router-dom';

export default function MediaCard(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"
                        src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.6435-9/80258477_2385822061670642_3771683375601942528_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=cdbe9c&_nc_ohc=mmkiX-c-CG4AX8Pbvym&_nc_ht=scontent.fsgn5-10.fna&oh=00_AT--Qa1DWcLFqgASZTI4t76V7KxrqlIkNkqXLgwKohjTmA&oe=625F78FF"
                    />
                }
                action={
                    <IconButton aria-label="settings">
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <p className=" text-3xl -mt-6 ml-5">...</p>
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Hidden post</MenuItem>
                            <MenuItem onClick={handleClose}>Edit</MenuItem>
                            <MenuItem onClick={handleClose}>Delete</MenuItem>
                        </Menu>
                    </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="194"
                image="https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.6435-9/80258477_2385822061670642_3771683375601942528_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=cdbe9c&_nc_ohc=mmkiX-c-CG4AX8Pbvym&_nc_ht=scontent.fsgn5-10.fna&oh=00_AT--Qa1DWcLFqgASZTI4t76V7KxrqlIkNkqXLgwKohjTmA&oe=625F78FF"
                alt="Paella dish"
            />
            <CardContent>
           
                <Link to="/post/view"><Typography variant="h5" >Title: Tại sao nên đi đánh Golf?  </Typography></Link>

            </CardContent>
        </Card>
    );
}