<template>
    <div class="min-h-screen flex items-center justify-center bg-black/40">
        <div class="bg-card-background rounded-2xl shadow-xl p-10 flex flex-col items-center w-[360px]">
            
            <template v-if="status === 'loading'">
                <Loader2 class="w-10 h-10 text-primary-blue animate-spin mb-4" />
                <p class="text-[15px] font-semibold text-[#0F172A]">Please wait, broker is connecting...</p>
                <p class="text-[13px] text-[#64748B] mt-1">Do not close this tab</p>
            </template>

            <template v-else-if="status === 'success'">
                <CheckCircle class="w-10 h-10 text-primary-green mb-4" />
                <p class="text-[15px] font-semibold text-[#0F172A]">Broker connected successfully!</p>
                <p class="text-[13px] text-[#64748B] mt-1">Redirecting to brokers...</p>
            </template>

            <template v-else>
                <XCircle class="w-10 h-10 text-red-500 mb-4" />
                <p class="text-[15px] font-semibold text-[#0F172A]">Connection failed</p>
                <p class="text-[13px] text-[#64748B] mt-1">{{ errorMsg }}</p>
                <button
                    @click="goToBrokers"
                    class="mt-4 px-4 py-2 text-[13px] font-semibold text-white bg-primary-blue rounded-lg hover:bg-primary-blue/90 transition">
                    Back to Brokers
                </button>
            </template>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Loader2, CheckCircle, XCircle } from 'lucide-vue-next';
import { useBrokerStore } from '../../stores/broker';

const route = useRoute();
const router = useRouter();
const brokerStore = useBrokerStore();

const status = ref('loading'); // 'loading' | 'success' | 'error'
const errorMsg = ref('Something went wrong. Please try again.');

// onMounted(async () => {
//     const { authCode, userId, appcode, tokenId } = route.query;

//     if (!authCode || !userId || !appcode) {
//         status.value = 'error';
//         errorMsg.value = 'Invalid callback parameters.';
//         return;
//     }

//     try {
//         await brokerStore.getBrokers(); 
//         await brokerStore.connectBroker({
//             auth_token: authCode,
//             appcode: appcode,
//         });
//         status.value = 'success';
//         setTimeout(() => { window.location.href = '/brokers'; }, 1000);
//     } catch (err) {
//         status.value = 'error';
//         errorMsg.value = err?.message || 'Connection failed. Please try again.';
//     }
// });
onMounted(async () => {
    const { authCode, userId, appcode, tokenId } = route.query

    // ── Dhan callback ─────────────────────────────────────────
    if (tokenId) {
        try {
            // await brokerStore.getBrokers()
            console.log('brokers loaded:', brokerStore.brokers)
            const dhanBroker = brokerStore.brokers.find(
                b => b.broker_name?.toLowerCase() === 'dhan'
            )
            console.log('dhan broker found:', dhanBroker)
            if (!dhanBroker) {
                status.value   = 'error'
                errorMsg.value = 'Dhan broker not found.'
                return
            }
            const success = await brokerStore.dhanCallback({
                brokerId: dhanBroker.id,
                tokenId,
            })
            console.log('Dhan callback result:', success)
            status.value = success ? 'success' : 'error'
            if (!success) errorMsg.value = 'Dhan connection failed.'
            if (success) setTimeout(() => { window.location.href = '/' }, 1000)
        } catch (err) {
            status.value   = 'error'
            errorMsg.value = err?.message || 'Connection failed.'
        }
        return
    }
    // ─────────────────────────────────────────────────────────

    // Alice flow — untouched
    if (!authCode || !userId || !appcode) {
        status.value   = 'error'
        errorMsg.value = 'Invalid callback parameters.'
        return
    }

    try {
        // await brokerStore.getBrokers()
        await brokerStore.connectBroker({
            auth_token: authCode,
            appcode: appcode,
        })
        status.value = 'success'
        setTimeout(() => { window.location.href = '/' }, 1000)
    } catch (err) {
        status.value   = 'error'
        errorMsg.value = err?.message || 'Connection failed. Please try again.'
    }
})

const goToBrokers = () => {
    window.location.href = '/';
};
</script>