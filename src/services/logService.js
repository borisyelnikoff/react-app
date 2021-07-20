import * as Sentry from '@sentry/react';
import { Integrations } from "@sentry/tracing";

function init() {
    Sentry.init({
    dsn: "https://fde6051c63534e32ae7f45ca91f36e55@o485617.ingest.sentry.io/5556862",
    autoSessionTracking: true,
    integrations: [
        new Integrations.BrowserTracing(),
    ],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
    });
}

function log(ex) {
    Sentry.captureException(ex);
}

export default {
    init,
    log
};