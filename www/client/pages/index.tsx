import { Container, CssBaseline, Theme, Button, Typography, Avatar, Paper, Grid, Input, TextField, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import SettingsIcon from '@material-ui/icons/Settings'
import MessageIcon from '@material-ui/icons/Message'
import { useState, useEffect, useMemo } from 'react'
import getId from '../api/bots/dev/getId'
import getSupervisors from '../api/bots/getSupervisors'
import executeSupervisor from '../api/bots/executeSupervisor'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

const createSupervisionExecutor = (id: string) =>
  ({ name, arity }: { name: string, arity: number }) =>
    () =>
      executeSupervisor(id, name, arity === 0 ? undefined : prompt('Podaj wartość'))

export default () => {
  const [id, setId] = useState(null)
  const [supervisors, setSupervisors] = useState([])

  useEffect(() => void (id && getSupervisors(id).then(setSupervisors)), [id])

  useEffect(() => void getId().then(setId), [])

  const supervisionExecutor = useMemo(() => createSupervisionExecutor(id), [id])

  const classes = useStyles({})

  return (
    <Container>
      <CssBaseline />
      <Card>
        <CardContent>
          <Typography variant="h3" gutterBottom>Bociak</Typography>
          {
            supervisors.map(({ name, title, arity }) =>
              <Button variant="contained" key={name} onClick={supervisionExecutor({ name, arity })} className={classes.button}>
              {
                title
              }
              </Button>
            )
          }
        </CardContent>
      </Card>
    </Container>
  )
}


/*
export default () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [botStatus, setBotStatus] = useState(BotStatus.NotChecked)
  const [supervisors, setSupervisors] = useState([])
  const classes = useStyles({})

  useEffect(() => {
    const checkBotStatus = async () => {
      const isRunning = await (await fetch(`${getServerUrl()}/dev/isRunning`)).json()
      setBotStatus(isRunning
        ? BotStatus.Running
        : BotStatus.Stopped
      )
    }

    checkBotStatus()
  }, [])

  useEffect(() => {
    if(botStatus !== BotStatus.Running)
      return

    const updateSupervisors = async () => {
      try {
        setSupervisors(
          await (await fetch(`${getServerUrl()}/dev/supervisors`)).json()
        )
      } catch(error){
        return
      }
    }

    updateSupervisors()
  }, [botStatus])

  const startBot = async () => {
    setBotStatus(BotStatus.Starting)
    await fetch(`${getServerUrl()}/dev/start`, {
      method: 'POST',
      body: JSON.stringify({ login, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    setBotStatus(BotStatus.Running)
  }

  const exitBot = () => {
    fetch(`${getServerUrl()}/dev/exit`, { method: 'POST' })
    setBotStatus(BotStatus.Stopped)
  }

  const execute = ({ name, arity }: { name: string, arity: number }) => async () => {
    const payload = (() => {
      if(arity === 0)
        return undefined

      const arg = prompt('Podaj argument')
      if(Number.isNaN(Number(arg)))
        return arg 

      return parseInt(arg)
    })()

    const response = await fetch(`${getServerUrl()}/dev/executeSupervisor`, {
      method: 'POST',
      body: JSON.stringify({ name, payload } as BotCommandDto),
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.text()
    if(result)
      alert(result)
  }

  return ( 
    <>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SettingsIcon />
          </Avatar>
          <Typography variant="h5" component="h1">
            Panel sterowania
          </Typography>
          {
            botStatus === BotStatus.NotChecked || botStatus === BotStatus.Starting
              ? (
                <Button variant="contained" color="primary" className={classes.runButton} disabled>
                  Uruchom bota
                </Button>
              ) : botStatus === BotStatus.Running
                ? (
                  <Button variant="contained" color="primary" className={classes.runButton} onClick={exitBot}>
                    Wyłącz bota
                  </Button>
                ) : (
                  <>
                    <p>
                      <TextField
                        label="Login"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                      />
                      <TextField
                        type="password"
                        label="Hasło"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </p>
                    <Button variant="contained" color="primary" className={classes.runButton} onClick={startBot}>
                      Uruchom bota
                    </Button>
                  </>
                )
          }
          {
            supervisors.length !== 0 && botStatus === BotStatus.Running && (
              <Grid container>
                <Grid item xs className={classes.list}>
                  <Typography variant="caption" gutterBottom>Opcje</Typography>
                  {
                    supervisors.map(({ name, title, arity }) =>
                      <Button 
                        variant="contained" 
                        className={classes.listButton} 
                        key={name} 
                        onClick={execute({ name, arity })}
                        {...arity !== 0 && { endIcon: <MessageIcon /> }}
                      >
                      {
                        title
                      }
                      </Button>
                    )
                  }
                </Grid>
              </Grid>
            )
          }
        </Paper>
      </Container>
    </>
  )
}*/