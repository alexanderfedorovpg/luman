import { css } from 'styled-components'

export const titleWrapper = props => css`
    margin: 0;

    line-height: 1.35;
    letter-spacing: -0.3px;

    ${props => {
        switch (props.rating) {
            case 1:
            case 2:
            case 3:
            case 4:
                return `
                    font-size: ${13+props.rating}px;
                `

            case 5:
                return `
                    font-size: 18px;
                    letter-spacing: -0.15px;
                `

            case 6:
                return `
                    font-size: 19px;
                    line-height: 24px;
                    letter-spacing: -0.15px;
                `

            case 7:
                return `
                    font-size: 20px;
                    line-height: 27px;
                    letter-spacing: 0.3px;
                `

            case 8:
                return `
                    font-size: 24px;
                    line-height: 29px;
                    letter-spacing: -0.3px;
                `
        }
    }}
`
