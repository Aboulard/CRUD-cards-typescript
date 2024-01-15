import Button from '@mui/material/Button';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { User } from '../../App';
import { useState } from 'react';

export type CreateUserType = {
    setUsersArray: React.Dispatch<React.SetStateAction<User[]>>;
    numberElem: number;
    setNumberElem: React.Dispatch<React.SetStateAction<number>>;
}


export function MyCreateUser({ setUsersArray, numberElem, setNumberElem }: CreateUserType) {
    /*
    Problème pas grave mais problème quand même:
    Quand je modifie les infos pour la création d'un User, c'est sauvegardé, ça se reset pas
    Peut-être rajouter un truc qui empeche d'entrer des infos vides    
    */

    const [openCreate, setOpenCreate] = useState(false);
    let [tmp_user, settmp_user] = useState<User>({ ID: -1, Nom: "", Age: 0, Prénom: "", Photo: "" })

    const handleClickCreateOpen = () => {
        setOpenCreate(true);
    };

    const handleCreateClose = () => {
        setOpenCreate(false);
    };

    const CreateUser = (myUser: User) => {
        setUsersArray(usersArray => [...usersArray, { ID: numberElem, Nom: myUser.Nom, Age: myUser.Age, Prénom: myUser.Prénom, Photo: myUser.Photo }])
        setNumberElem(numberElem + 1)
    }

    return (
        <>
            <Button
                sx={{ margin: 'auto' }}
                variant='contained'
                onClick={handleClickCreateOpen}
            >
                Add User
            </Button>
            <Dialog open={openCreate} onClose={handleCreateClose} title='Dialog Box to Create new User'>
                <DialogTitle>Create User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Insert information corresponding to the User you are trying to add
                    </DialogContentText>
                    <TextField
                        //                    required
                        id="Prénom"
                        label="Prénom"
                        variant="outlined"
                        margin="normal"
                        onChange={(v) => settmp_user((previous: User) => ({ ...previous, Prénom: v.target.value }))} /><br></br>
                    <TextField
                        //                    required
                        id="Nom"
                        label="Nom"
                        variant="outlined"
                        margin="normal"
                        onChange={(v) => settmp_user((previous: User) => ({ ...previous, Nom: v.target.value }))} /><br></br>
                    <TextField
                        //                    required
                        id="Age"
                        label="Age"
                        type="number"
                        variant="outlined"
                        margin="normal"
                        onChange={(v) => settmp_user((previous: User) => ({ ...previous, Age: Number(v.target.value) }))} /><br></br>
                    <TextField
                        //                    required
                        id="Photo_URL"
                        label="Photo_URL"
                        variant="outlined"
                        margin="normal"
                        onChange={(v) => settmp_user((previous: User) => ({ ...previous, Photo: v.target.value }))} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateClose}>Cancel</Button>
                    <Button onClick={() => { CreateUser(tmp_user); handleCreateClose(); }}>Add User</Button>
                </DialogActions>
            </Dialog></>
    )
}
