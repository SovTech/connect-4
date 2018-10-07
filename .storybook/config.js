import {configure} from '@storybook/react'
import 'react-chromatic/storybook-addon'
import {GLOBAL_STYLES} from '../src/globalStyles';
import {injectGlobal} from "styled-components";

injectGlobal([GLOBAL_STYLES]);

const req = require.context('../src/components', true, /\.story\.tsx$/);
configure(() => {
    req.keys().forEach((filename) => req(filename))
}, module);
