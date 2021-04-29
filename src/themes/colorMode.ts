import { DefaultTheme } from 'styled-components'

const colorModeTransition =
    'background 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad)';

export const lightTheme: DefaultTheme = {

    colorModeTransition,
    text: {
        heading: '#2d3748',
        body: '#2d3748',
        subtitle: '#a0aec0',
    },
    colors: {
        default: '#363537',
        gray: 'gray',
        brown: 'brown',
        orange: 'orange',
        yellow: 'yellow',
        green: 'green',
        blue: '#0B6E99',
        purple: 'purple',
        pink: 'pink',
        red: 'red'
    },
    background: {
        default: '#ffffff',
        gray: 'gray',
        brown: 'brown',
        orange: 'orange',
        yellow: 'yellow',
        green: 'green',
        blue: 'blue',
        purple: 'purple',
        pink: 'pink',
        red: 'red'
    }
}

export const darkTheme: DefaultTheme = {

    colorModeTransition,
    text: {
        heading: '#ffffff',
        body: '#cbd5e0',
        subtitle: '#a0aec0',
    },
    colors: {

        default: '#FAFAFA',
        gray: 'gray',
        brown: 'brown',
        orange: 'orange',
        yellow: 'yellow',
        green: 'green',
        blue: '#529CCA',
        purple: 'purple',
        pink: 'pink',
        red: 'red'
    },

    background: {
        default: '#1A202C',
        gray: 'gray',
        brown: 'brown',
        orange: 'orange',
        yellow: 'yellow',
        green: 'green',
        blue: 'blue',
        purple: 'purple',
        pink: 'pink',
        red: 'red'
    }
}
