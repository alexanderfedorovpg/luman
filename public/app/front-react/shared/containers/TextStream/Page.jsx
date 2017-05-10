import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

// eslint-disable-next-line react/prefer-stateless-function
class componentName extends PureComponent {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Текстовая трансляция</title>
                </Helmet>
            </div>
        );
    }
}

export default componentName;
