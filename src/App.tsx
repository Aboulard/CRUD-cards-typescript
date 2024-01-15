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

  const [numberElem, setNumberElem] = useState(20)


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
        textAlign={'center'}
        bgcolor={"LightBlue"}
        minWidth={"80vw"}
        minHeight={"60vh"}
        margin={5}
        borderRadius={10}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {
            usersArray.map((user, index) => {
              return (
                <Grid key={`${index}`} item container direction="row" xs={8} sm={12 / 5} >
                  <UserCard currentUser={user} usersArray={usersArray} setUsersArray={setUsersArray} />
                </Grid>
              )
            })
          }
        </Grid>
        <MyCreateUser setUsersArray={setUsersArray} numberElem={numberElem} setNumberElem={setNumberElem} />
      </Box>
    </div>
  );
}

export default App;