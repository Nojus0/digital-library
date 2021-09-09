
/**
 * Only add variants, don't add animate, initial properties.
 */
export const child = {
    hidden: {
        y: -50,
        opacity: 0,
    },
    show: {
        y: 0,
        opacity: 1,
    }
}

/**
 * Add initial, show and variants property.
 */
export const parent = {
    hidden: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.03,
            duration: 0.4,
        }
    }
}