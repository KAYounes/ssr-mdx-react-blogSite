"use client";

import React from "react";

function useToggler(init = null, onState = true, offState = false) {
    const [state, setState] = React.useState(init);

    const toggler = React.useCallback(function () {
        setState(function (prev) {
            if (prev === onState) return offState;
            if (prev === offState) return onState;
            return state;
        });
    }, []);

    return [state, toggler];
}

export default useToggler;
