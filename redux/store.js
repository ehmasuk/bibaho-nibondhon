const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: {
        dummy: (state = {}) => state,
    },
});

export default store;
