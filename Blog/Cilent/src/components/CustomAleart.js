import React , { useState, useEffect} from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

 function FlashMessage (props)  {


 const [message , setMessage] = useState();
 useEffect(() => {
    if(props?.message){
        setMessage(props?.message)
        setOpen(true)
    };
  }, [props?.message]);

 const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
              if (reason === 'clickaway') {
            return;
        }
        setOpen(false)
    };
    
    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {message}
                    
                </Alert>
            </Snackbar>
        </div>
    )
}
export default FlashMessage


