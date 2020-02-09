import dev from './dev';
import prod from './prod';

const configs = process.env.NODE_ENV === 'development' ? dev : prod;

export default configs;
