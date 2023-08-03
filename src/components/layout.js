import React, { useContext } from 'react'
import PropTypes from "prop-types"
import styled, { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme } from "../styles/theme"
import GlobalStyle from "../styles/globalStyle"
import { useDarkMode } from "../hooks"
import Context from "../context"
import Footer from "./footer"

// https://medium.com/@chrisfitkin/how-to-smooth-scroll-links-in-gatsby-3dc445299558
if (typeof window !== "undefined") {
    require("smooth-scroll")('a[href*="#"]')
  }

const StyledLayoutWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
`

const Layout = ({ children }) => {
    const { isIntroDone } = useContext(Context).state 
    const darkModeEnabled = useDarkMode()
    const theme = darkModeEnabled ? darkTheme : lightTheme

    return(
        <StyledLayoutWrapper id="layout-wrapper">
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                {isIntroDone ? (
                    <>
                        <main id="main-content">{children}</main>
                        <Footer />
                    </>
                ): (
                    <p>Loading...</p>
                )}
            </ThemeProvider>
        </StyledLayoutWrapper>
    )
}

Layout.propTypes = {
    children: PropTypes.any,
}

export default Layout
