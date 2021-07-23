import styled from "@emotion/styled";

export const Form = styled.div({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1rem",
    h1: {
      margin: "0.25rem 0 0.5rem 0",
      textAlign: "center",
      fontWeight: 500,
      fontSize: "4.25rem",
    },
    button: {
      margin: "0.75rem 0",
      width: "100%",
      padding: "1.3rem"
    },
    input: {
      marginTop: "1rem",
      width: "100%"
    },
    p: {
      padding: "0.5rem 0",
      margin: "0",
      fontSize: "0.85rem",
      alignItems: "center",
      textAlign: "center",
      justifyContent: "center",
      color: "#b8b8b8"
    },
    span: {
      userSelect: "none",
      color: "#2B2B2B",
      marginLeft: ".40rem",
      cursor: "pointer"
    }
  })