import React from "react";

export function ProfileSvg(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g id="Frame">
                <path
                    id="Body"
                    d="M1 13.5C4 7.49999 10 7.5 13 13.5"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <circle id="Head" cx="7" cy="4" r="3" stroke="black" />
            </g>
        </svg>
    );
}

