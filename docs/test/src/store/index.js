// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        claim: {
            inputClaim: "None",
            data: {
                sentData: undefined,
                artData: undefined,
            },
        }
    },
    getters: {},
    mutations: {
        changeName(state, newclaim) {
            state.claim.inputClaim = newclaim
        },
        updateSentData(state, sentData) {
            state.claim.data.sentData = sentData;

        },
        updateArtData(state, artData) {
            state.claim.data.artData = artData;
        }
    },
    actions: {}
});