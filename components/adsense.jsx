"use client";

import React, { useEffect } from "react";

const Adsense = () => {
  useEffect(() => {
    // Load AdSense script dynamically
    const script = document.createElement("script");
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    // Initialize AdSense ads
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("AdSense Error:", error);
    }
  }, []);
  return (
    <div>
      {/* Google AdSense Ad */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9989342385772910"
        data-ad-slot="9404231234"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    </div>
  );
};

export default Adsense;
