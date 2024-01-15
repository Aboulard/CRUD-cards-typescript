import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { MediaCard, MyUpdateUser } from './assets/AppComponents/Mediacard';
import { MyCreateUser, MyCreateUserButton } from './assets/AppComponents/MyDialogs';

// The user type that I created contains a user specific ID that helps to identify them and all information relevant to that users card

/*
type setUSer = {
  tmp_user: User;
  settmp_user: React.Dispatch<React.SetStateAction<User>>;
}*/

export type User = {
  ID: number;
  Nom: string;
  Prénom: string;
  Age: number;
  Photo: string;
}

export type CreateUserType = {
  openCreate: boolean;
  setOpenCreate: React.Dispatch<React.SetStateAction<boolean>>
  setUsersArray: React.Dispatch<React.SetStateAction<User[]>>;
  numberElem: number;
  setnumberElem: React.Dispatch<React.SetStateAction<number>>;
}

export type UpdateUserType = {
  openUpdate: boolean;
  handleUpdateClose: () => void;
  UpdateUserInfo: (my_user: User) => void;
  tmp_user: User;
  settmp_user: React.Dispatch<React.SetStateAction<User>>;
}

export type CreateUserButton = {
  setOpenCreate: React.Dispatch<React.SetStateAction<boolean>>
}

// This is the main function of this program, it creates a box in which cards with user information will be created and handled.

function App() {
  const [usersArray, setUsersArray] = useState<User[]>([])
  const [tmp_user, settmp_user] = useState<User>({ ID: -1, Nom: "tmp", Age: 0, Prénom: "tmp", Photo: "tmp" })

  const [numberElem, setnumberElem] = useState(20)

  const [openCreate, setOpenCreate] = useState(false);
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
          spacing={{ xs: 2, md: 3 }}
          justifyItems={'center'}
          columns={{ xs: 4, sm: 8, md: 12 }}        //          columns={{ xs: 4, sm: 6, md: 10 }} //Je n'ai pas réussi à le faire marcher comme je le voulais
        >
          {
            usersArray.map((user) => {
              return (
                <Grid item container direction="row" xs={8} sm={3}>
                  <MediaCard key={user.ID} current_user={user} handleDelete={handleDelete} handleUpdate={handleClickOpenUpdate} />
                </Grid>
              )
            })
          }
        </Grid>
        <Box>
          <MyCreateUserButton setOpenCreate={setOpenCreate} />
        </Box>
      </Box>
      <MyCreateUser openCreate={openCreate} setOpenCreate={setOpenCreate} setUsersArray={setUsersArray} numberElem={numberElem} setnumberElem={setnumberElem} />
      <MyUpdateUser openUpdate={openUpdate} handleUpdateClose={handleUpdateClose} UpdateUserInfo={UpdateUserInfo} tmp_user={tmp_user} settmp_user={settmp_user} />
    </div>
  );
}

export default App;