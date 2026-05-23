<script setup>
import { reactive, ref } from 'vue';
import { ChevronLeft, EyeIcon, EyeOffIcon } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';

const isSendOtp = ref(false);
const requested = ref(false);
const error = ref('');

const forgotPasswordFormData = reactive({
    email: '',
});

const enterOtpPasswordData = reactive({
    otp: '',
    password: '',
});

const forgotFormErrors = reactive({
    email: '',
});

const otpFormErrors = reactive({
    otp: '',
    password: '',
});

const passwordFields = reactive({
    showOTPPassword: false,
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateSendOTP = () => {
    forgotFormErrors.email = '';
    error.value = '';

    if (!forgotPasswordFormData.email.trim()) {
        forgotFormErrors.email = 'Email is required.';
    } else if (!emailRegex.test(forgotPasswordFormData.email)) {
        forgotFormErrors.email = 'Please enter a valid email.';
    }

    return !forgotFormErrors.email;
};

const validateResetPassword = () => {
    otpFormErrors.otp = '';
    otpFormErrors.password = '';
    error.value = '';

    let valid = true;

    if (!enterOtpPasswordData.otp.trim()) {
        otpFormErrors.otp = 'OTP is required.';
        valid = false;
    } else if (enterOtpPasswordData.otp.trim().length < 4) {
        otpFormErrors.otp = 'OTP must be at least 4 digits.';
        valid = false;
    }

    if (!enterOtpPasswordData.password) {
        otpFormErrors.password = 'Password is required.';
        valid = false;
    } else if (enterOtpPasswordData.password.length < 6) {
        otpFormErrors.password = 'Password must be at least 6 characters long.';
        valid = false;
    }

    return valid;
};

// --- API integration will go here ---
const sendOTPForgot = async () => {
    if (!validateSendOTP()) return;
    // TODO: Call sendForgotOTP API
    // Simulate OTP screen for UI testing
    isSendOtp.value = true;
};

const submitForgotPassword = async () => {
    if (!validateResetPassword()) return;
    // TODO: Call forgot password API + router.push('/login')
};

const togglePasswordVisibility = (field) => {
    passwordFields[field] = !passwordFields[field];
};
</script>

<template>
    <section class="flex items-center min-h-screen font-geist">

        <!-- Left Panel -->
        <div class="hidden xl:block xl:w-1/2 bg-[#1A1919] h-screen text-center px-4 py-8 md:py-10">
            <div class="flex items-center justify-center">
                <img src="/svg/logo.svg" alt="Logo" class="h-10 md:h-auto" />
            </div>

            <div class="flex items-center flex-col gap-2 mt-6 md:mt-10">
                <h2
                    class="leading-tight text-transparent bg-clip-text text-2xl md:text-[38.2px] max-w-xl font-semibold bg-gradient-to-r from-[#387ED1] to-[#ffffff]">
                    One platform. Multiple brokers. Infinite opportunities
                </h2>
                <p class="text-sm md:text-[18px] text-[#ADB2B9] font-normal px-4">
                    Seamlessly manage your portfolio and earn smarter every day.
                </p>
            </div>

            <div class="mt-6 md:mt-10">
                <img src="/login.png" alt="forgot password" class="max-w-full mx-auto object-contain" />
            </div>
        </div>

        <!-- Right Panel -->
        <div
            class="w-full xl:w-1/2 flex flex-col items-center justify-center py-8 md:py-10 px-6 md:px-10 lg:px-20 xl:px-32 min-h-screen">

            <!-- Mobile Logo -->
            <div class="flex xl:hidden items-center justify-center mb-6">
                <img src="/svg/logo.svg" alt="Logo" />
            </div>

            <!-- Header -->
            <div class="flex items-center justify-start gap-4 w-full mb-8">
                <RouterLink to="/login"
                    class="border border-black border-opacity-20 p-2 rounded-full flex items-center justify-center shrink-0 hover:bg-gray-50 transition-colors">
                    <ChevronLeft class="w-5 h-5" />
                </RouterLink>

                <div class="text-left">
                    <h1 class="font-semibold text-2xl lg:text-[40px] leading-tight">Forgot Password</h1>
                    <p class="text-sm text-gray-400 mt-0.5">
                        <span v-if="!isSendOtp">Please enter your email to reset the password</span>
                        <span v-else>We've sent an OTP to <span class="font-medium text-gray-600">{{ forgotPasswordFormData.email }}</span></span>
                    </p>
                </div>
            </div>

            <!-- Step Indicator -->
            <div class="flex items-center gap-2 w-full mb-8">
                <div class="flex items-center gap-2">
                    <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
                        :class="!isSendOtp ? 'bg-[#387ED1] text-white' : 'bg-green-500 text-white'">
                        <svg v-if="isSendOtp" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        <span v-else>1</span>
                    </div>
                    <span class="text-xs font-medium" :class="!isSendOtp ? 'text-[#387ED1]' : 'text-green-500'">
                        Enter Email
                    </span>
                </div>

                <div class="flex-1 h-px mx-2"
                    :class="isSendOtp ? 'bg-green-400' : 'bg-gray-200'">
                </div>

                <div class="flex items-center gap-2">
                    <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
                        :class="isSendOtp ? 'bg-[#387ED1] text-white' : 'bg-gray-200 text-gray-400'">
                        2
                    </div>
                    <span class="text-xs font-medium" :class="isSendOtp ? 'text-[#387ED1]' : 'text-gray-400'">
                        Reset Password
                    </span>
                </div>
            </div>

            <!-- Step 1: Email Form -->
            <div v-if="!isSendOtp" class="w-full space-y-4">
                <div class="space-y-1">
                    <label for="forgot-email" class="text-sm font-medium">Email</label>
                    <input
                        type="text" id="forgot-email" name="email"
                        v-model.trim="forgotPasswordFormData.email"
                        placeholder="Enter your registered email address"
                        :class="[forgotFormErrors.email ? 'border-red-500' : 'border-black border-opacity-40', 'w-full border py-2 rounded-md outline-none px-4 bg-transparent text-sm focus:border-[#387ED1] transition-colors']"
                    />
                    <p v-if="forgotFormErrors.email" class="text-red-500 text-xs mt-1">
                        {{ forgotFormErrors.email }}
                    </p>
                    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
                </div>

                <button
                    @click="sendOTPForgot" :disabled="requested"
                    class="bg-[#387ED1] hover:bg-[#2d6dbf] w-full text-white py-2.5 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    {{ requested ? 'Sending OTP...' : 'Send OTP' }}
                </button>

                <p class="text-center text-sm text-gray-500">
                    Remember your password?
                    <RouterLink to="/login" class="text-[#387ED1] font-semibold hover:underline">Login</RouterLink>
                </p>
            </div>

            <!-- Step 2: OTP + New Password Form -->
            <div v-else class="w-full space-y-4">

                <!-- OTP -->
                <div class="space-y-1">
                    <label for="otp" class="text-sm font-medium">OTP</label>
                    <input
                        type="text" id="otp" name="otp"
                        v-model.trim="enterOtpPasswordData.otp"
                        placeholder="Enter the OTP sent to your email"
                        maxlength="6"
                        :class="[otpFormErrors.otp ? 'border-red-500' : 'border-black border-opacity-40', 'w-full border py-2 rounded-md outline-none px-4 bg-transparent text-sm tracking-widest focus:border-[#387ED1] transition-colors']"
                    />
                    <p v-if="otpFormErrors.otp" class="text-red-500 text-xs mt-1">{{ otpFormErrors.otp }}</p>
                </div>

                <!-- New Password -->
                <div class="space-y-1">
                    <label for="new-password" class="text-sm font-medium">New Password</label>
                    <div class="relative">
                        <input
                            :type="passwordFields.showOTPPassword ? 'text' : 'password'"
                            id="new-password" name="password"
                            v-model.trim="enterOtpPasswordData.password"
                            placeholder="Enter your new password"
                            :class="[otpFormErrors.password ? 'border-red-500' : 'border-black border-opacity-40', 'w-full border py-2 rounded-md outline-none px-4 pr-10 bg-transparent text-sm focus:border-[#387ED1] transition-colors']"
                        />
                        <span
                            @click="togglePasswordVisibility('showOTPPassword')"
                            class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors">
                            <EyeOffIcon v-if="passwordFields.showOTPPassword" class="w-4 h-4" />
                            <EyeIcon v-else class="w-4 h-4" />
                        </span>
                    </div>
                    <p v-if="otpFormErrors.password" class="text-red-500 text-xs mt-1">{{ otpFormErrors.password }}</p>
                    <p v-else-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
                </div>

                <button
                    @click="submitForgotPassword" :disabled="requested"
                    class="bg-[#387ED1] hover:bg-[#2d6dbf] w-full text-white py-2.5 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    {{ requested ? 'Resetting...' : 'Reset Password' }}
                </button>

                <p class="text-center text-xs text-gray-400">
                    Didn't receive the OTP?
                    <button type="button" @click="isSendOtp = false" class="text-[#387ED1] font-medium hover:underline">
                        Resend
                    </button>
                </p>

                <button
                    type="button" @click="isSendOtp = false"
                    class="border border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-700 w-full py-2.5 rounded-md text-sm font-medium transition-colors">
                    ← Back
                </button>
            </div>
        </div>
    </section>
</template>
