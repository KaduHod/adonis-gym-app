export const classProxyDecorator = ({_Class, handler}) => {
    return (...params) => new Proxy(new _Class(...params), handler)
}

export const proxyDecorator = ({fn, handler}) => {
    return (...params) => new Proxy(fn(...params), handler)
}
