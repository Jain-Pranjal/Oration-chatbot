//making of the landing page
import React from 'react'

import ScrollToTop from '@/components/global/ScrollToTop'
import SmoothScroll from '../components/SmoothScroll'
import Hero from '../components/Hero'
const LandingPage = () => {
    return (
        <>
            <SmoothScroll />
            <div className="bg-[#090a0a]">
                <Hero />
                <ScrollToTop />
            </div>
        </>
    )
}

export default LandingPage
