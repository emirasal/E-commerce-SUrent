import { Paper } from '@mui/material';

//DESIGNED FOR RANDOM IMAGES(img)
function Item({item})
{
    return (
        <Paper>
            <img src={item} width="675" height="675"/>
        </Paper>
    )
}

export default Item;