import React, { useEffect, useState } from "react"
import { isServerSide } from "src/next/graphql"

export function useOnScreen(ref: React.MutableRefObject<any>) {
    if (isServerSide || ref.current == null) return false;

    const [isIntersecting, setIntersecting] = useState(false)

    const observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting)
    )

    useEffect(() => {
        observer.observe(ref.current)
        // Remove the observer as soon as the component is unmounted
        return () => { observer.disconnect() }
    }, [])

    return isIntersecting
}