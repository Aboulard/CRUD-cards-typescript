import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { UserCard } from './assets/AppComponents/UserCard';
import { MyCreateUser } from './assets/AppComponents/CreateUser';

// The user type that I created contains a user specific ID that helps to identify them and all information relevant to that users card

export type User = {
  ID: number;
  Nom: string;
  Prénom: string;
  Age: number;
  Photo: string;
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
        const newArray = data[0].Users.map((User: User) => {
          return { ID: User.ID, Nom: User.Nom, Age: User.Age, Prénom: User.Prénom, Photo: User.Photo }
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
            usersArray.map((user, index) => {
              return (
                <Grid key={`${index}`} item container direction="row" xs={8} sm={3}>
                  <UserCard current_user={user} usersArray={usersArray} setUsersArray={setUsersArray} />
                </Grid>
              )
            })
          }
        </Grid>
        <Box>
          <MyCreateUser setUsersArray={setUsersArray} numberElem={numberElem} setnumberElem={setnumberElem} />
        </Box>
      </Box>
    </div>
  );
}

export default App;