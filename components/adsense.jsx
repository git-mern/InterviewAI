"use client";

import Script from "next/script";
import React, { useEffect } from "react";

const Adsense = () => {
  useEffect(() => {
    <Script
      async
      src={
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9989342385772910"
      }
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("AdSense Error:", error);
    }
  }, []);
};

export default Adsense;
