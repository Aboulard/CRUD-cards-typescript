import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { User } from "../../App"


// MediaCardProps is a type that was created to send necessary arguments from one function to another while staying typescript friendly 

export type MediaCardProps = {
    current_user: User;
    handleDelete: (my_user: User) => void;
    handleUpdate: (my_user: User) => void;
}

// This function contains all the code necessary to create and handle a Card, with it's user Data, and possibilty of modifying or deleting it

export function MediaCard({ current_user, handleDelete, handleUpdate }: MediaCardProps) {
    return (
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
                        onClick={() => handleUpdate(current_user)}>
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
    );
}
