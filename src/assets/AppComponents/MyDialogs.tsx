import Button from '@mui/material/Button';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { User, CreateUserType } from '../../App';
import { useState } from 'react';

export function MyCreateUser({ openCreate, handleCreateClose, CreateUser }: CreateUserType) {
    /*
    Problème pas grave mais problème quand même:
    Quand je modifie les infos pour la création d'un User, c'est sauvegardé, ça se reset pas
    Peut-être rajouter un truc qui empeche d'entrer des infos vides    
    */
    let [tmp_user, settmp_user] = useState<User>({ ID: -1, Nom: "tmp", Age: 0, Prénom: "tmp", Photo: "tmp" })

    return (
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
                    onChange={(v) => settmp_user((previous: User) => ({ ...previous, Prénom: v.target.value }))}
                /><br></br>
                <TextField
//                    required
                    id="Nom"
                    label="Nom"
                    variant="outlined"
                    margin="normal"
                    onChange={(v) => settmp_user((previous: User) => ({ ...previous, Nom: v.target.value }))}
                /><br></br>
                <TextField
//                    required
                    id="Age"
                    label="Age"
                    type="number"
                    variant="outlined"
                    margin="normal"
                    onChange={(v) => settmp_user((previous: User) => ({ ...previous, Age: Number(v.target.value) }))}
                /><br></br>
                <TextField
//                    required
                    id="Photo_URL"
                    label="Photo_URL"
                    variant="outlined"
                    margin="normal"
                    onChange={(v) => settmp_user((previous: User) => ({ ...previous, Photo: v.target.value }))}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCreateClose}>Cancel</Button>
                <Button onClick={() => { CreateUser(tmp_user); handleCreateClose(); }}>Add User</Button>
            </DialogActions>
        </Dialog>
    )
}
