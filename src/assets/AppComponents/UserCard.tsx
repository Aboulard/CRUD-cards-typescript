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
    currentUser: User;
    usersArray: User[];
    setUsersArray: React.Dispatch<React.SetStateAction<User[]>>
}

// This function contains all the code necessary to create and handle a Card, with it's user Data, and possibilty of modifying or deleting it

export function UserCard({ currentUser, usersArray, setUsersArray }: UserCardProps) {

    const [tmpUser, setTmpUser] = useState<User>({ ID: -1, Nom: "tmp", Age: 0, Prénom: "tmp", Photo: "tmp" })
    const [openUpdate, setOpenUpdate] = useState(false);

    const handleClickOpenUpdate = (myUser: User) => {
        setTmpUser(myUser)
        setOpenUpdate(true);
    };

    const handleUpdateClose = () => {
        setOpenUpdate(false);
    };

    const handleDelete = (myUser: User) => {
        const newArray = usersArray.filter((user) => user.ID !== myUser.ID);
        setUsersArray(newArray)
    }

    const handleUpdateUserInfo = () => {
        setUsersArray(usersArray.map((user: User) => {
            if (user.ID === tmpUser.ID) {
                console.log("I'm at user: ", tmpUser)
                return tmpUser
            }
            return user
        }))
    }

    return (
        <>
            <Grid item xs={2}>
                <Card sx={{ width: 200, margin: 3 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={currentUser.Photo}
                        title={currentUser.Prénom + " " + currentUser.Nom}
                    />
                    <CardContent>
                        <Typography gutterBottom align='center'>
                            {currentUser.Prénom}<br></br>{currentUser.Nom}<br></br>{String(currentUser.Age)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            sx={{ margin: 'auto' }}
                            size="small"
                            variant="outlined"
                            onClick={() => handleClickOpenUpdate(currentUser)}>
                            Update
                        </Button>
                        <Button
                            sx={{ margin: 'auto' }}
                            size="small"
                            variant="outlined"
                            color='error'
                            onClick={() => handleDelete(currentUser)}>
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
                        label={tmpUser.Prénom}
                        variant="outlined"
                        margin="normal"
                        onChange={(v) => setTmpUser((previous) => ({ ...previous, Prénom: v.target.value }))}
                    /><br></br>
                    <TextField
                        required
                        id="Nom"
                        label={tmpUser.Nom}
                        variant="outlined"
                        margin="normal"
                        onChange={(v) => setTmpUser((previous) => ({ ...previous, Nom: v.target.value }))}
                    /><br></br>
                    <TextField
                        required
                        id="Age"
                        label={tmpUser.Age}
                        type="number"
                        variant="outlined"
                        margin="normal"
                        onChange={(v) => setTmpUser((previous) => ({ ...previous, Age: Number(v.target.value) }))}
                    /><br></br>
                    <TextField
                        required
                        id="Photo_URL"
                        label={tmpUser.Photo}
                        variant="outlined"
                        margin="normal"
                        onChange={(v) => setTmpUser((previous) => ({ ...previous, Photo: v.target.value }))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateClose}>Cancel</Button>
                    <Button onClick={() => { handleUpdateUserInfo(); handleUpdateClose(); }}>Modify User</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

