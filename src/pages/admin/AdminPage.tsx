import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { AdminPanel } from '../../components /adminPanel/AdminPanel'

export const AdminPage = () => {
  return (
    <Grid
      container
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <h1>
        <Typography>Admin panel</Typography>
      </h1>
      <AdminPanel />
    </Grid>
  )
}
