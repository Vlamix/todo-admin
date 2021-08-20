import {
  Fab,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core'
import React, { useState } from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { logoutUser } from '../../redux/features/auth/auth.slice'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: '25ch',
    },
  }),
)

export const AdminPanel = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const classes = useStyles()
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logoutUser())
  }

  const handleFind = () => {
    setInputValue('')
  }

  return (
    <Grid container>
      <Grid
        container
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Fab color={'secondary'} size={'small'} onClick={logoutHandler}>
          <ExitToAppIcon />
        </Fab>
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">
            Find user
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={'text'}
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value)
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleFind}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
    </Grid>
  )
}
