import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function MainLayout({ isSignedIn, onSignOut, children }) {
    return (
        <>
            <Header isSignedIn={isSignedIn} onSignOut={onSignOut} />
            <Sidebar />
            <div style={{ marginLeft: '240px' }}>
                {children}
            </div>
            <Footer />
        </>
    )
}
