/**
 * Created by work on 01.05.17.
 */

import React, {PropTypes} from 'react';
import styled from 'styled-components'

const User = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-right: 0.6875rem;
`

const UserPicLink = styled.a`
    max-width: 100%;
    height: 100%;
    border-radius: 50%;
    -o-object-fit: cover;
    object-fit: cover;
    border: 0;
        img{
            max-width: 100%;
            height: 100%;
            border-radius: 50%;
            -o-object-fit: cover;
            object-fit: cover;
        }
    }
`;

const UserNameLink = styled.a`
    margin-top: -3px!important;
    font-size: 24px!important;
    font-weight: 600!important;
    color: #333!important;
    letter-spacing: -0.2px!important;
    text-decoration: none !important;
`;


function UserRow({author}){
    return (
    <User>
        <UserPicLink href="javascript:void(0)">
            <img src="//{author.avatar}"/>
        </UserPicLink>
        <UserNameLink href="javascript:void(0)">
            {author.name}
        </UserNameLink>
    </User>
)}


export default UserRow

