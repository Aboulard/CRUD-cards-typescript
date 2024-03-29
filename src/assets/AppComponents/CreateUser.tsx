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

    const [openCreate, setOpenCreate] = useState(false);
    let [tmp_user, settmp_user] = useState<User>({ ID: -1, Nom: "tmp", Age: 0, Prénom: "tmp", Photo: "tmp" })

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
                        id="Prénom"
                        label="Prénom"
                        variant="outlined"
                        margin="normal"
                        onChange={(v) => settmp_user((previous: User) => ({ ...previous, Prénom: v.target.value }))} /><br></br>
                    <TextField
                        id="Nom"
                        label="Nom"
                        variant="outlined"
                        margin="normal"
                        onChange={(v) => settmp_user((previous: User) => ({ ...previous, Nom: v.target.value }))} /><br></br>
                    <TextField
                        id="Age"
                        label="Age"
                        type="number"
                        variant="outlined"
                        margin="normal"
                        onChange={(v) => settmp_user((previous: User) => ({ ...previous, Age: Number(v.target.value) }))} /><br></br>
                    <TextField
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
