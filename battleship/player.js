const createPlayer = (name, type) => {
    if (type === 'human') {
        return {name, type};
    } else {
        //computer logic
        const logic = () => {

        }
        return {name, type , logic};
    }
    
}