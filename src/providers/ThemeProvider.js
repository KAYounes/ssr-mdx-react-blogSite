"use client";

import { isClient, isServer } from "@/utils/checks";
import { execOnce } from "next/dist/shared/lib/utils";
import React from "react";

export const ThemeContext = React.createContext();

function getColorSchemeQueryString(theme) {
    return `(prefers-color-scheme: ${theme})`;
}

export default function ThemeProvider({ children }) {
    const mediaQueries = React.useRef({
        dark: isClient() ? window.matchMedia(getColorSchemeQueryString("dark")) : null,
        light: isClient() ? window.matchMedia(getColorSchemeQueryString("light")) : null,
    });

    const [theme, setTheme] = React.useState(function () {
        if (isServer()) return null;
        if (mediaQueries.current?.dark.matches) return "dark";
        if (mediaQueries.current?.light.matches) return "light";
    });

    const autoTheming = React.useRef(false);

    React.useEffect(function () {
        if (isServer()) return;

        for (let query in mediaQueries.current) {
            mediaQueries.current[query].addEventListener("change", function (event) {
                if (event.media === mediaQueries.current[query].media && event.matches) {
                    if (autoTheming.current) setTheme(query);
                }
            });
        }
    }, []);

    React.useEffect(
        function () {
            if (isServer()) return;
            document.documentElement.setAttribute("data-theme", theme);
        },
        [theme],
    );

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setThemeLight,
                setThemeDark,
                setThemeAuto,
            }}>
            {children}
        </ThemeContext.Provider>
    );

    function setThemeLight() {
        setTheme("light");
        autoTheming.current = false;
    }

    function setThemeDark() {
        setTheme("dark");
        autoTheming.current = false;
    }

    function setThemeAuto() {
        autoTheming.current = true;

        if (mediaQueries.current.dark.matches) setTheme("dark");
        if (mediaQueries.current.light.matches) setTheme("light");
    }
}
