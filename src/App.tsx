import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { MediaCard } from './assets/AppComponents/Mediacard';
import { MyCreateUser } from './assets/AppComponents/CreateUser';

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

  const [numberElem, setnumberElem] = useState(20)

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
        console.log(newArray)
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
                  <MediaCard key={user.ID} current_user={user} usersArray={usersArray} setUsersArray={setUsersArray} />
                </Grid>
              )
            })
          }
        </Grid>
        <Box>
          <MyCreateUser setUsersArray={setUsersArray} numberElem={numberElem} setnumberElem={setnumberElem} />
        </Box>
      </Box>
      {/* <MyUpdateUser openUpdate={openUpdate} handleUpdateClose={handleUpdateClose} UpdateUserInfo={UpdateUserInfo} tmp_user={tmp_user} settmp_user={settmp_user} /> */}
    </div>
  );
}

export default App;