import React from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { rem } from 'utils/style';
import { Group, FileInput } from 'components/Form';
import Button from 'components/Button';

import {
    Wrapper,
    Display,
    StyledCheckbox as Checkbox,
    StyledTextarea as Textarea,
} from './style';

const Details = () => (
    <Wrapper>
        <Display />
        <form>
            <Group md>
                <Textarea block />
            </Group>
            <Group md>
                <FileInput
                    block
                    icon="clip"
                />
            </Group>
            <Group md horizontal>
                <Checkbox>
                    Вывести на главную
                </Checkbox>
                <Checkbox>
                    Включить таймер
                </Checkbox>
            </Group>
            <Button success block>
                Включить прямой эфир
            </Button>
        </form>
    </Wrapper>
);

export default Details;
