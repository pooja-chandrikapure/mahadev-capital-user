<template>
    <section class="flex flex-col md:flex-row items-center justify-center min-h-screen font-geist">

        <!-- Left side - branding -->
        <div class="hidden xl:block xl:w-1/2 bg-[#1A1919] min-h-[50vh] md:h-screen text-center px-4 py-8 md:py-10">
            <div class="flex items-center justify-center">
                <img src="/svg/logo.svg" alt="Logo" class="h-10 md:h-auto" />
            </div>

            <div class="flex items-center flex-col gap-2 mt-6 md:mt-10">
                <h2 class="leading-tight text-transparent bg-clip-text text-2xl md:text-[38.2px] max-w-xl font-semibold bg-gradient-to-r from-[#387ED1] to-[#ffffff]">
                    One platform. Multiple brokers. Infinite opportunities
                </h2>
                <p class="text-sm md:text-[18px] text-[#ADB2B9] font-[400] px-4">
                    Seamlessly manage your portfolio, monitor performance, and earn smarter every day.
                </p>
            </div>

            <div class="mt-6 md:mt-10">
                <img src="/login.png" alt="login" class="max-w-full mx-auto" />
            </div>
        </div>

        <!-- Right side - login form -->
        <div class="w-full xl:w-1/2 flex flex-col items-center justify-start py-8 md:py-10 px-6 md:px-10 lg:px-20 xl:px-32">

            <!-- Mobile logo -->
            <div class="flex xl:hidden items-center justify-center py-4">
                <img src="/svg/logo.svg" alt="Logo" />
            </div>

            <h1 class="font-semibold text-2xl md:text-[40px]">Sign In</h1>
            <p class="text-sm text-gray-500 mt-1">Welcome back! Please enter your details.</p>

            <form
                @submit.prevent="login"
                @keydown.enter.prevent="handleEnterKey"
                class="w-full mt-4 md:mt-6 space-y-4"
            >
                <!-- Email -->
                <div class="space-y-1">
                    <p class="text-sm font-medium">Email</p>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        v-model="loginFormData.email"
                        class="w-full border border-black border-opacity-40 py-2 rounded-md outline-none px-4 bg-transparent"
                    />
                    <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
                </div>

                <!-- Password -->
                <div class="space-y-1">
                    <p class="text-sm font-medium">Password</p>
                    <div class="w-full border border-black border-opacity-40 rounded-md outline-none px-4 bg-transparent flex items-center justify-between">
                        <input
                            :type="showPassword ? 'text' : 'password'"
                            v-model="loginFormData.password"
                            placeholder="Enter your password"
                            class="bg-transparent w-full py-2 outline-none"
                        />
                        <button
                            type="button"
                            @click="togglePasswordVisibility"
                            class="pi"
                            :class="showPassword ? 'pi-eye-slash' : 'pi-eye'"
                        />
                    </div>
                    <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
                </div>

                <!-- T&C + Forgot Password -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between text-xs md:text-sm gap-2">
                    <div class="flex items-center gap-2">
                        <input type="checkbox" v-model="checkTnC" id="tnc" class="cursor-pointer" />
                        <label for="tnc" class="cursor-pointer">
                            I agree to the Mahadev Capital
                            <a href="/terms-and-conditions" target="_blank" class="hover:underline text-custom-blue">T&C</a>
                            and
                            <a href="/terms-and-conditions" target="_blank" class="hover:underline text-custom-blue">Privacy Policy</a>
                        </label>
                    </div>
                    <router-link to="/forgot-password" class="text-blue-500 font-semibold whitespace-nowrap">
                        Forgot Password?
                    </router-link>
                </div>

                <!-- Submit -->
                <button
                    type="submit"
                    :disabled="!checkTnC || requested"
                    :class="[
                        'w-full py-2 rounded-md font-medium transition-all duration-150',
                        checkTnC && !requested
                            ? 'bg-[#387ED1] text-white hover:opacity-90'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    ]"
                >
                    <span v-if="requested" class="flex items-center justify-center gap-2">
                        <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Logging in...
                    </span>
                    <span v-else>Sign In</span>
                </button>

                <p class="text-center opacity-50 text-sm md:text-base">
                    Don't have an account?
                    <router-link class="opacity-100 font-semibold" to="/register">Register</router-link>
                </p>
            </form>
        </div>
    </section>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import apiRequest from "../../api/request";
import urls from "../../api/urls";
import authToken from "../../common/authToken";
import { useToastStore } from "../../stores/toast";

const toast    = useToastStore();
const router   = useRouter();

const checkTnC    = ref(false);
const requested   = ref(false);
const showPassword = ref(false);

const loginFormData = reactive({
    email   : "",
    password: "",
});

const errors = reactive({
    email   : "",
    password: "",
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Validation ───────────────────────────────────────────
const validateLogin = () => {
    errors.email    = "";
    errors.password = "";

    if (!loginFormData.email.trim()) {
        errors.email = "Email is required.";
    } else if (!emailRegex.test(loginFormData.email)) {
        errors.email = "Please enter a valid email.";
    }

    if (!loginFormData.password) {
        errors.password = "Password is required.";
    } else if (loginFormData.password.length < 6) {
        errors.password = "Password must be at least 6 characters long.";
    }

    if (!checkTnC.value) {
        toast.warning("Please agree to the T&C before signing in.");
        return false;
    }

    if (errors.email || errors.password) {
        toast.warning("Please fix the highlighted fields and try again.");
        return false;
    }

    return true;
};

// ── Login ─────────────────────────────────────────────────
const login = async () => {
    if (!validateLogin()) return;

    requested.value = true;

    const onSuccess = (res) => {
        // API returns token at root level: { token, message, data }
        authToken.setToken(res.token);
        localStorage.setItem("role", "USER");
        router.push("/");
    };

    const onFailure = (error) => {
        toast.error(error.message ?? "Login failed. Please try again.", 3000);
    };

    await apiRequest('post', urls.userLogin, {
        data: loginFormData,
        onSuccess,
        onFailure,
        isTokenRequired: false,
    });

    requested.value = false;
};

const handleEnterKey = () => {
    if (checkTnC.value) login();
};

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};
</script>


<style scoped>
@media screen and (max-width: 640px) {
    .font-geist {
        font-size: 14px;
    }
}
</style>
