import React, { useState } from 'react'
import {
  Backdrop,
  Button,
  Card,
  CircularProgress,
  createStyles,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  Snackbar,
  TextField,
  Theme,
} from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import clsx from 'clsx'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useDispatch } from 'react-redux'
import { loginUser, registerUser } from '../../redux/features/auth/auth.slice'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStylesLoading = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
)
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
  }),
)

interface State {
  amount: string
  password: string
  weight: string
  weightRange: string
  showPassword: boolean
}

export const AuthPage = () => {
  const classesLoading = useStylesLoading()
  const dispatch = useDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const classes = useStyles()
  const [openMessage, setOpenMessage] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [values, setValues] = useState<State>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })

  const handleRegister = async () => {
    setOpen(true)
    const res = await dispatch(
      registerUser({
        email: email,
        password: values.password,
        role: 'admin',
      }),
    )
    console.log(res)
    if (!res) {
      setOpen(false)
    } else {
      setOpen(false)
      setOpenMessage(true)
      setMessage('Не коректные данные регистрации')
    }
  }

  const handleLogin = async () => {
    setOpen(true)
    const res = await dispatch(
      loginUser({
        email: email,
        password: values.password,
      }),
    )
    console.log(res)

    if (!res) {
      setOpen(false)
    } else {
      setOpen(false)
      setMessage('Не коректные данные авторизации')
      setOpenMessage(true)
    }
  }

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenMessage(false)
  }

  return (
    <>
      <Card
        style={{
          width: '90%',
          margin: 'auto',
          marginTop: '60%',
        }}
      >
        <Grid
          container
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <TextField
            className={clsx(classes.margin, classes.textField)}
            label={'Email'}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Grid direction={'row'}>
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleRegister}>Registration</Button>
          </Grid>
        </Grid>
      </Card>
      <Backdrop className={classesLoading.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={openMessage}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          style={{ marginBottom: '5%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}
