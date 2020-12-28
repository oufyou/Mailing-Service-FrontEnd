import MailMS from './MailMS';
import ProducerRT from "./ProducerRT";

export const MailMSConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/mail',
            component: MailMS,
        },
        {
            path     : '/producerRT',
            component: ProducerRT,
        },
    ]
};
