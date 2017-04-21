import React from 'react';
import { Checkbox } from 'components/Form/Input';
import Button from 'components/Button';
import {
    Wrapper,
    Display,
} from './style';

const LiveDetails = () => (
    <Wrapper>
        <Display />
        <form>
            <Checkbox>
                Вывести на главную
            </Checkbox>
            <Checkbox>
                Включить таймер
            </Checkbox>
            <Button success block>
                Включить прямой эфир
            </Button>
        </form>
    </Wrapper>
);

export default LiveDetails;
