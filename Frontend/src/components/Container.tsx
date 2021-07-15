import styled from "@emotion/styled";
import React from "react";
import styles from "../../styles/container.module.scss";

export function Container({
    max,
    min,
    value,
    children,
    classes,
    InsideWrapperStyle,
    stretch = true,
    WrapperStyle,
    container,
    wrapper,
}: IContainer) {
    return (
        <ContainerWrapper {...wrapper} style={WrapperStyle}>
            <div
                {...container}
                className={`${stretch ? styles.stretch : ""} ${classes ? classes : ""}`}
                style={{
                    width: `clamp(${min},${value}, ${max})`, ...InsideWrapperStyle
                }}
            >
                {children}
            </div>
        </ContainerWrapper>
    );
}

export default Container;



export interface IContainer {
    min: string;
    value: string;
    max: string;
    children?: any;
    classes?: string;
    /**
     * Styles for a div inside wrapper div, wrapper[div] -> container[div] -> children
     * If you want to add margin to
     */
    InsideWrapperStyle?: React.CSSProperties;

    /**
     * Wrapper div attributes
     */
    wrapper?: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >;

    /**
     * Container div attributes
     */
    container?: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >;
    /**
     * Styles for the wrapper, wrapper[div] -> container[div] -> children
     * If adding margin i recommed adding it to the
     * wrapper instead of the container in the wrapper.
     */
    WrapperStyle?: React.CSSProperties;

    /**
     * Makes the container inside the wrapper width 100%,
     * default true
     */
    stretch?: boolean;
}

const ContainerWrapper = styled.div({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& > div": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
});