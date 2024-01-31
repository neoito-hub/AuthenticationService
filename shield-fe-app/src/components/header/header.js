import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { shield } from '@appblocks/js-sdk'
import axios from 'axios'
import useOutsideClick from '../hooks/useOutsideClick'

import Logo from '../../assets/img/logo.png'
import LogoTxt from '../../assets/img/logo-txt.svg'

const Header = (props) => {
  const [userDetails, setUserDetails] = useState(null)

  const [profDropdown, setProfDropdown] = useState(false)
  const [responsiveView, setResponsiveView] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const isLoggedInRef = useRef(isLoggedIn)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setResponsiveView(false)
      }
    }
    window.addEventListener('resize', handleResize)
  })

  const verifyLoggedIn = async () => {
    setIsLoggedIn(await shield.validateAccessToken())
  }

  const onFocus = async () => {
    const valid = await shield.validateAccessToken()

    if (isLoggedInRef.current && !valid) {
      await shield.logoutWithoutRedirect()
      window.location.reload()
    }
    if (!isLoggedInRef.current && valid) {
      setIsLoggedIn(valid)
    }
  }

  useEffect(() => {
    const handleStorageChange = () => {
      const newValue = localStorage.getItem('_ab_t')
      if (newValue) verifyLoggedIn()
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  verifyLoggedIn()

  useEffect(() => {
    window.addEventListener('focus', onFocus)

    return () => {
      window.removeEventListener('focus', onFocus)
    }
  }, [])

  const profDropContainer = useOutsideClick(() => {
    setProfDropdown(false)
  })

  const handleLogoClick = () => {
    setProfDropdown(!profDropdown)
  }

  const apiHelper = async (baseUrl, subUrl, value = null, apiType = 'post') => {
    const token = shield.tokenStore.getToken()
    try {
      const { data } = await axios({
        method: apiType,
        url: `${baseUrl}${subUrl}`,
        data: value && value,
        headers: token && {
          Authorization: `Bearer ${token}`,
        },
      })
      return data?.data
    } catch (err) {
      console.log('msg', err)

      // --> commented inorder to avoid logging out if unauthorised return
      // --> its not needed because store is public

      // if (err.response.status === 401) shield.logout();
      return err
    }
  }

  useEffect(() => {
    isLoggedInRef.current = isLoggedIn
    const getUserDetails = async () => {
      const res = await apiHelper(
        process.env.SHIELD_AUTH_URL || 'https://shield.appblocks.com/',
        'get-user-details',
        null,
        'get'
      )
      // await getCartCount()
      console.log(res)
      setUserDetails(res)
    }

    if (isLoggedIn) {
      getUserDetails()
    }
  }, [isLoggedIn])

  const signOut = async () => {
    setProfDropdown(false)
    await shield.logoutWithoutRedirect()
    window.location.reload()
  }

  return (
    <header className="border-ab-gray-medium fixed top-0 left-0 z-[999] w-full border-b bg-white">
      <div className="flex h-16 w-full px-4 md:items-center md:justify-between md:space-x-4 md:px-6 xl:px-12">
        <div className="flex flex-grow items-center py-2">
          <div className="flex w-full items-center">
            <Link
              to="/"
              className="flex flex-shrink-0 items-center focus:outline-none"
            >
              <img className="max-w-[48px]" alt="appblocks-logo" src={Logo} />
              <img
                className="lg-lt:hidden ml-3"
                alt="appblocks"
                src={LogoTxt}
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center">
          <div
            id="navbar-responsive"
            className={`nav-menu-wrapper custom-scroll-primary md-lt:bg-white md-lt:py-1.5 md-lt:shadow-lg ${
              !responsiveView ? 'md-lt:-right-64' : 'md-lt:right-0'
            }`}
          >
            <span className="text-[#D9D9D9] ml-4 md-lt:hidden">|</span>
            {!isLoggedIn && isLoggedIn !== null && (
              <ul className="my-3 flex flex-col text-ab-sm font-medium md:my-0 md:ml-4 md:flex-row md:items-center md:space-x-4 md-lt:items-start md-lt:space-y-3">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      shield.verifyLogin()
                    }}
                    className="text-primary block cursor-pointer hover:underline"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      shield.verifyLogin('signup')
                    }}
                    className="btn-primary block py-2 font-medium leading-tight"
                  >
                    Sign Up
                  </button>
                </li>
              </ul>
            )}
            {isLoggedIn && isLoggedIn !== null && (
              <div className="my-3 flex flex-col text-sm md:my-0 md:ml-4 md:flex-row md:items-center md:space-x-4 md-lt:items-start md-lt:space-y-3">
                <div
                  className="relative float-left flex-shrink-0 md-lt:w-full"
                  ref={profDropContainer}
                >
                  <div
                    onClick={handleLogoClick}
                    className="flex h-8 cursor-pointer select-none items-center space-x-1.5"
                  >
                    <span className="bg-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white capitalize">
                      {userDetails && userDetails?.full_name
                        ? userDetails?.full_name[0]
                        : userDetails?.email[0]}
                    </span>
                    <p className="text-ab-black w-full truncate text-xs font-semibold md:hidden">
                      {userDetails && userDetails?.full_name
                        ? userDetails?.full_name
                        : userDetails?.email}
                    </p>
                  </div>
                  <div
                    className={`border-ab-medium dropDownFade top-12 right-0 z-10 bg-white py-3 md:absolute md:min-w-[260px] md:border md:px-4 md-lt:w-full ${
                      profDropdown ? '' : 'md:hidden'
                    }`}
                  >
                    <div className="mb-2">
                      <p>Signed in as</p>
                      <span className=" font-semibold ">
                        {userDetails?.email}
                      </span>
                    </div>
                    <ul>
                      <li key="signout" onClick={signOut} className="py-2">
                        <span className="text-ab-red cursor-pointer text-sm hover:underline">
                          Log out
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-shrink-0 items-center" />
        </div>
      </div>
    </header>
  )
}

export default Header
