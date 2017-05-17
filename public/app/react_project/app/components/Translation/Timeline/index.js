import React from 'react'
import { FormattedTime } from 'react-intl'

import {
    Root,
    Item,
    Left,
    Right,
    Title,
    Img,
    Video
} from './style'

function Timeline({ data, onClick }) {

    return (
        <Root>
            {data.map(v => (
                <Item key={v.id} onClick={() => onClick(v)}>
                    <Left>
                        {v.publish_date
                            && (
                                <FormattedTime
                                    value={v.publish_date}
                                    hour="2-digit"
                                    minute="2-digit" />
                            )
                        }
                    </Left>
                    <Right>
                        <Title>
                            <div dangerouslySetInnerHTML={{ __html: v.body }} />
                        </Title>
                        {v.image_preview
                            && (
                                <Img>
                                    <img src={v.image_preview.url} />
                                </Img>
                            )
                        }
                        {v.video_stream_preview
                            && (
                                <Video>
                                    <img src={v.video_stream_preview.url} />
                                </Video>
                            )
                        }
                    </Right>
                </Item>
            ))}
        </Root>
    )
}

export default Timeline
