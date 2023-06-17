import { Link, navigate, routes } from '@redwoodjs/router'
import { useRef, useState, useEffect } from 'react'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const InputField = ({ name, label, type = 'text', ...rest }) => (
    <>
      <Label name={name} className="rw-label" errorClassName="rw-label rw-label-error">
        {label}
      </Label>
      {(type === 'text') ? (
        <TextField
          name={name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          {...rest}
        />
      ) : (
        <PasswordField
          name={name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          {...rest}
        />
      )}
      <FieldError name={name} className="rw-field-error" />
    </>
  )

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await logIn({ ...data })
      toast.success('Welcome back!')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <MetaTags title="Login" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Login</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <InputField
                    name="username"
                    label="Username"
                    ref={usernameRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Username is required',
                      },
                    }}
                  />

                  <InputField
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                  />

                  <div className="rw-forgot-link">
                    <Link to={routes.forgotPassword()} className="rw-forgot-link">
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="rw-button-group">
                    <Submit disabled={loading} className="rw-button rw-button-blue">
                      {loading ? 'Loading...' : 'Login'}
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span>Don&apos;t have an account?</span>{' '}
            <Link to={routes.signup()} className="rw-link">
              Sign up!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage