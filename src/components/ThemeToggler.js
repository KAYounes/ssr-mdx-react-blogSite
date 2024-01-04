"use client";
import useToggler from "@/hooks/useToggler";
import { ThemeContext } from "@/providers/ThemeProvider";
import { isClient, isServer } from "@/utils/checks";
import { Meie_Script } from "next/font/google";
import React from "react";

export default function ThemeToggler() {
    const { setThemeLight, setThemeDark, setThemeAuto } = React.useContext(ThemeContext);

    return (
        <div>
            <button onClick={setThemeLight}>light</button>
            <button onClick={setThemeAuto}>auto</button>
            <button onClick={setThemeDark}>dark</button>
        </div>
    );

    function updateHTMLTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
    }
}
