import React, { useState, useEffect } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { Card, CardBody, CardHeader, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import { Mail, File } from 'react-feather'

const ConnectionsTabContent = () => {
  const [profile, setProfile] = useState([])
  const clientId = '896819639652-rhg79p2c8kete06bjvnugbvfo9ijk66l.apps.googleusercontent.com'
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId,
        scope: `https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.resource https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.photos.readonly https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/userinfo.email`
      })
    }
    gapi.load('client:auth2', initClient)
  })

  const onSuccess = (res) => {
    setProfile(res.profileObj)
  }

  const onFailure = (err) => {
    console.log('failed', err)
  }

  const logOut = () => {
    setProfile(null)
  }

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return (
    <Card>
      <CardHeader>
        <Nav pills className='mb-2'>
          <NavItem>
            <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
              <Mail className='font-medium-3 me-50' />
              <span className='fw-bold'>G Mail</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
              <File className='font-medium-3 me-50' />
              <span className='fw-bold'>Google Drive</span>
            </NavLink>
          </NavItem>
        </Nav>
      </CardHeader>
      <CardBody>
        <TabContent activeTab={active}>
          <TabPane tabId='1'>

          </TabPane>
          <TabPane tabId='2'>
            <div>
              <h5>Google Drive Login</h5>
              {Object.keys(profile).length > 0 ? (
                <div>
                  <h6>User Logged in</h6>
                  <p>Name: {profile.name}</p>
                  <p>Email Address: {profile.email}</p>
                  <br />
                  <br />
                  <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
                </div>
              ) : (
                <GoogleLogin
                  clientId={clientId}
                  buttonText="Sign in with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={'single_host_origin'}
                  isSignedIn={true}
                />
              )}
            </div>
          </TabPane>
        </TabContent>
      </CardBody>
    </Card>
  )
}
export default ConnectionsTabContent