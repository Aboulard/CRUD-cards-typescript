import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { User } from '../../App';
import { useState } from 'react';


// MediaCardProps is a type that was created to send necessary arguments from one function to another while staying typescript friendly 

export type MediaCardProps = {
    current_user: User;
    usersArray: User[];
    setUsersArray: React.Dispatch<React.SetStateAction<User[]>>
}

// This function contains all the code necessary to create and handle a Card, with it's user Data, and possibilty of modifying or deleting it

export function MediaCard({ current_user, usersArray, setUsersArray }: MediaCardProps) {

    const [tmp_user, settmp_user] = useState<User>({ ID: -1, Nom: "tmp", Age: 0, Prénom: "tmp", Photo: "tmp" })
    const [openUpdate, setOpenUpdate] = useState(false);

    const handleClickOpenUpdate = (my_user: User) => {
        settmp_user(my_user)
        setOpenUpdate(true);
    };

    const handleUpdateClose = () => {
        setOpenUpdate(false);
    };

    const handleDelete = (my_user: User) => {
        const newArray = usersArray.filter((user) => user.ID !== my_user.ID);
        setUsersArray(newArray)
    }

    const UpdateUserInfo = (my_user: User) => { // A modifier avec Tarik, il veut pas que j'utilise splice 
        const newArray = usersArray.filter((user) => user.ID == my_user.ID);
        const myIndex = usersArray.indexOf(newArray[0])
        console.log(my_user)

        usersArray.splice(myIndex, 1, my_user)
    }

    return (
        <>
            <Grid item xs={2}>
                <Card sx={{ width: 200, margin: 3 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={current_user.Photo}
                        title={current_user.Prénom + " " + current_user.Nom}
                    />
                    <CardContent>
                        <Typography gutterBottom align='center'>
                            {current_user.Prénom}<br></br>{current_user.Nom}<br></br>{String(current_user.Age)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            sx={{ margin: 'auto' }}
                            size="small"
                            variant="outlined"
                            onClick={() => handleClickOpenUpdate(current_user)}>
                            Update
                        </Button>
                        <Button
                            sx={{ margin: 'auto' }}
                            size="small"
                            variant="outlined"
                            color='error'
                            onClick={() => handleDelete(current_user)}>
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Dialog open={openUpdate} onClose={handleUpdateClose} title='Dialog Box to Update Existing User'>
                <DialogTitle>Modify User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Modify Information on the current user
                    </DialogContentText>
                    <TextField
                        required
                        id="Prénom"
                        label={tmp_user.Prénom}
                        variant="outlined"
                        margin="normal"
                        onChange={(v) => settmp_user((previous) => ({ ...previous, Prénom: v.target.value }))}
                    /><br></br>
                    <TextField
                        required
                        id="Nom"
                        label={tmp_user.Nom}
                        variant="outlined"
                        margin="normal"
                        onChange={(v) => settmp_user((previous) => ({ ...previous, Nom: v.target.value }))}
                    /><br></br>
                    <TextField
                        required
                        id="Age"
                        label={tmp_user.Age}
                        type="number"
                        variant="outlined"
                        margin="normal"
                        onChange={(v) => settmp_user((previous) => ({ ...previous, Age: Number(v.target.value) }))}
                    /><br></br>
                    <TextField
                        required
                        id="Photo_URL"
                        label={tmp_user.Photo}
                        variant="outlined"
                        margin="normal"
                        onChange={(v) => settmp_user((previous) => ({ ...previous, Photo: v.target.value }))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateClose}>Cancel</Button>
                    <Button onClick={() => { UpdateUserInfo(tmp_user); handleUpdateClose(); }}>Modify User</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
