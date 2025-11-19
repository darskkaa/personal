"use client";

import { forwardRef, Suspense, useImperativeHandle, useRef } from "react";
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from "@react-three/drei";

export const View = forwardRef(({ children, ...props }: any, ref) => {
    const localRef = useRef(null);
    useImperativeHandle(ref, () => localRef.current);

    return (
        <>
            <div ref={localRef} {...props} />
            <ViewImpl track={localRef}>
                {children}
            </ViewImpl>
        </>
    );
});

View.displayName = "View";
