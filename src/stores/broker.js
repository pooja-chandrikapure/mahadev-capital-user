import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiRequest from '../api/request';
import urls from '../api/urls';

export const useBrokerStore = defineStore('brokers', () => {
    const brokers = ref([]);

    const getBrokers = async () => {
        return new Promise((resolve) => {  // ← wrap in Promise
            const onSuccess = (res) => {
                brokers.value = res.data?.brokers || [];
                resolve();
            };
            const onFailure = (error) => {
                console.error('error in broker store', error);
                resolve();
            };
            apiRequest('get', urls.brokers, {
                onSuccess,
                onFailure,
                params: {},
            });
        });
    };

    const connectBroker = async ({ auth_token, appcode }) => {
        console.log('all brokers:', brokers.value);
        console.log('looking for appcode:', appcode);
        
        const broker = brokers.value.find(b => b.broker_api === appcode);
        console.log('found broker:', broker);
        if (!broker) {
            console.error('broker not found for appcode:', appcode);
            return;
        }

        const onSuccess = (response) => {
            getBrokers();
        };

        const onFailure = (error) => {
            console.log('error in connecting broker', error);
            throw error;
        };

        return await apiRequest('put', urls.connectBroker, {
            onSuccess,
            onFailure,
            look_up_key: broker.id,
            data: { auth_token, appcode },
        });
    };

    const dhanCallback = async ({ brokerId, tokenId }) => {
        let success = false
        // const onSuccess = () => { success = true }
        const onSuccess = () => { 
                success = true
                getBrokers()  // ← add this so broker list refreshes after connect
            }
        const onFailure = (error) => { console.error('dhan callback error', error) }
        await apiRequest('put', urls.connectBroker, {  // ← same endpoint as Alice
            onSuccess,
            onFailure,
            look_up_key: brokerId,
            data: { token_id: tokenId },
        })
        return success
    };

    // only for dhan not for alice //
    const dhanConnect = async (brokerId) => {
        let loginUrl = null;
        const onSuccess = (res) => {
            loginUrl = res.login_url || res.data?.login_url;
        };
        const onFailure = (error) => {
            console.error('error in dhan connect', error);
        };
        await apiRequest('post', urls.dhanConnect, {
            onSuccess,
            onFailure,
            look_up_key: brokerId,
        });
        return loginUrl;
    };
    getBrokers();

    
    return {
        brokers,
        getBrokers,
        connectBroker,
        dhanCallback,
        dhanConnect,
    };
});
