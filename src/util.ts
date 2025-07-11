function makeGetUniqueId() {
    let uid = 0;
    return {get: (()=> uid++), reset: (()=> {uid = 0})};
}

export let uid = makeGetUniqueId();