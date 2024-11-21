import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Assets from "../assets/Assets";

interface TitleProps {
    title?: string;
    description?: string;
}

const Title: React.FC<TitleProps> = ({ title = "", description = "" }) => {
    const ogTitle = `${title} | Evaristus Adimonyemma`;
    const describe = description || "Building a world of possibilities"

    return (
        <HelmetProvider>
            <Helmet>
                <title>{ogTitle}</title>
                <meta name="description" content={describe} />
                <meta name="author" content="Evaristus Adimonyemma" />
                <meta name="keywords" content="Profile, Evaristus Adimonyemma, Evaristus, Adimonyemma, CEO Serch, CEO Serchservice" />
                <meta name="creator" content="Evaristus Adimonyemma" />
                <meta name="robots" content="index, follow" />
                {/* {  && (<meta name="viewport" content="width=1024" />)} */}
                <link rel="canonical" href="https://iamevaristus.github.io" />
                <meta name="classification" content="Portfolio" />
                <meta name="category" content="Portfolio" />
                <link rel="icon" href="/favicon.png" type="icon/png" sizes="32x32" />
                <link rel="apple-touch-icon" href="/favicon.png" type="icon/png" sizes="32x32" />

                {/* Open Graph */}
                <meta property="og:title" content={ogTitle} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={Assets.logo.background} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://iamevaristus.github.io" />
                <meta property="og:site_name" content="Evaristus Adimonyemma" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@iamevaristus" />
                <meta name="twitter:creator" content="@iamevaristus" />
                <meta name="twitter:title" content={ogTitle} />
                <meta name="twitter:description" content={describe} />
                <meta name="twitter:image" content={Assets.logo.background} />
            </Helmet>
        </HelmetProvider>
    );
};

export default Title;