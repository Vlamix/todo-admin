import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { AdminPage } from '../pages/admin/AdminPage'
import { AuthPage } from '../pages/auth/AuthPage'

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/admin" exact>
          <AdminPage />
        </Route>
        <Redirect to="/admin" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/auth" exact>
        <AuthPage />
      </Route>
      <Redirect to="auth" />
    </Switch>
  )
}
