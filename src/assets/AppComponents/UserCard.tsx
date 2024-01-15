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


// UserCardProps is a type that was created to send necessary arguments from one function to another while staying typescript friendly 

export type UserCardProps = {
    current_user: User;
    usersArray: User[];
    setUsersArray: React.Dispatch<React.SetStateAction<User[]>>
}

// This function contains all the code necessary to create and handle a Card, with it's user Data, and possibilty of modifying or deleting it

export function UserCard({ current_user, usersArray, setUsersArray }: UserCardProps) {

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

    const UpdateUserInfo = () => { // A modifier avec Tarik, il veut pas que j'utilise splice 
        // const newArray = usersArray.filter((user) => user.ID == tmp_user.ID);
        // const userIndex = usersArray.indexOf(newArray[0])
        
        // usersArray.splice(userIndex, 1, tmp_user)
        // setUsersArray(usersArray)
        const tmpArray = usersArray.filter((user) => user.ID != tmp_user.ID) // Donne toute la liste sans l'élément que je veux
        const newArray = usersArray.filter((user) => user.ID == tmp_user.ID) // Donne uniquement l'élément que je veux
        const userIndex = usersArray.indexOf(newArray[0]) // Donne la position dans la liste initiale de l'élément que je veux

        tmpArray.splice(userIndex, 0, tmp_user)
        setUsersArray(tmpArray)
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
                    <Button onClick={() => { UpdateUserInfo(); handleUpdateClose(); }}>Modify User</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
