import AvatarGenerator from 'react-avatar-generator';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function StudentCard({ student }) {
  return (
    <Grid item lg={4} sm={6} xs={12}>
      <Card>
        <CardHeader
          avatar={
            <AvatarGenerator
              colors={['#2196f3', '#ffeb3b', '#f44336', '#64dd17']}
              width={60}
              height={60}
            />
          }
          title={student.name}
          subheader={
            <>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Id:</b> {student.rollNo} | <b>Total Marks:</b>
                {Object.values(student.marks).reduce((a, b) => a + b)}
              </Typography>
            </>
          }
        />
      </Card>
    </Grid>
  );
}
