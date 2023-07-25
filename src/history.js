class OwnHistory {
    listeners = new Set();

    pushState = (targetLocation) => {
        // eslint-disable-next-line no-restricted-globals
        history.pushState(null, '', targetLocation);
        this.listeners.forEach(callback => {
            callback(targetLocation);
        })
    }

    listen = (listener) => {
        this.listeners.add(listener)
        return () => this.listeners.delete(listener);
    }

}

export const ownHistory = new OwnHistory();
