import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { MediaCard } from './assets/AppComponents/Mediacard';
import { MyCreateUser, MyUpdateUser } from './assets/AppComponents/MyDialogs';

// The user type that I created contains a user specific ID that helps to identify them and all information relevant to that users card


export type User = {
  ID: number;
  Nom: string;
  Prénom: string;
  Age: number;
  Photo: string;
}

export type CreateUserType = {
  openCreate: boolean;
  handleCreateClose: () => void;
  CreateUser: (my_user: User) => void;
}

export type UpdateUserType = {
  openUpdate: boolean;
  handleUpdateClose: () => void;
  UpdateUserInfo: (my_user: User) => void;
  tmp_user: User;
  settmp_user: React.Dispatch<React.SetStateAction<User>>;
}

// This is the main function of this program, it creates a box in which cards with user information will be created and handled.

function App() {
  const [usersArray, setUsersArray] = useState<User[]>([])
  const [tmp_user, settmp_user] = useState<User>({ ID: -1, Nom: "tmp", Age: 0, Prénom: "tmp", Photo: "tmp" })

  const [numberElem, setnumberElem] = useState(20)

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleClickCreateOpen = () => {
    setOpenCreate(true);
  };

  const handleCreateClose = () => {
    setOpenCreate(false);
  };

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

  const CreateUser = (my_user: User) => {
    setUsersArray(usersArray => [...usersArray, { ID: numberElem, Nom: my_user.Nom, Age: my_user.Age, Prénom: my_user.Prénom, Photo: my_user.Photo }])
    setnumberElem(numberElem + 1)
  }

  const UpdateUserInfo = (my_user: User) => { // A modifier avec Tarik, il veut pas que j'utilise splice 
    const newArray = usersArray.filter((user) => user.ID == my_user.ID);
    const myIndex = usersArray.indexOf(newArray[0])

    usersArray.splice(myIndex, 1, my_user)
  }


  useEffect(() => {
    fetch(`/users`)
      .then(response => {
        return (response.json())
      })
      .then(data => {
        const newArray = data[0].Users.map((User: User, counter: number) => {
          return { ID: counter, Nom: User.Nom, Age: User.Age, Prénom: User.Prénom, Photo: User.Photo }
        });
        setUsersArray(newArray)
      })
  }, []);

  return (
    <div>
      <Box
        textAlign={"center"}
        bgcolor={"LightGrey"}
        minWidth={"80vw"}
        minHeight={"60vh"}
        margin={5}
        padding={2}
        borderRadius={5}
      >
        <Grid
          container
          rowSpacing={1}
          columnSpacing={1}
          columns={{ xs: 4, sm: 6, md: 10 }} //Je n'ai pas réussi à le faire marcher comme je le voulais
        >
          {
            usersArray.map((user) => {
              return <MediaCard key={user.ID} current_user={user} handleDelete={handleDelete} handleUpdate={handleClickOpenUpdate} />
            })
          }
        </Grid>
        <Box>
          <Button
            sx={{ margin: 'auto' }}
            variant='contained'
            onClick={handleClickCreateOpen}
          >
            Add User
          </Button>
        </Box>
      </Box>
      <MyCreateUser openCreate={openCreate} handleCreateClose={handleCreateClose} CreateUser={CreateUser} />
      <MyUpdateUser openUpdate={openUpdate} handleUpdateClose={handleUpdateClose} UpdateUserInfo={UpdateUserInfo} tmp_user={tmp_user} settmp_user={settmp_user}/>
    </div>
  );
}

export default App;