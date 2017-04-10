import React from 'react'
import styled from 'styled-components'

import { font } from '../../constants/style'

const Root = styled.div`
    display: flex;
    justify-content: flex-start;

    height: 90px;
`

const Pics = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    margin-right: 8px;
`

const AddButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 90px;

    font-family: ${font.opensans};
    font-size: 48px;
    font-weight: 300;
    text-align: center;

    background-color: #f0f0f0;
    text-decoration: none;

    span {
        opacity: 0.39;
        color: #666666;
    }
`

const Item = styled.div`
    flex: 1;
    margin-right: 4px;

    &:last-child {
        margin-right: 0;
    }

    img {
        display: block;
        max-width: 100%;
        height: 100%;

        object-fit: cover;
    }
`

function Gallery({ className, data }) {
    return (
        <Root className={className}>
            <Pics>
                {data.map(image => {
                    return (
                        <Item key={image}>
                            <img src={image} />
                        </Item>
                    )
                })}
            </Pics>
            <AddButton href="#">
                <span>
                    +
                </span>
            </AddButton>
        </Root>
    )
}

Gallery.PropTypes = {
    data: React.PropTypes.array.isRequired
}

export default Gallery
