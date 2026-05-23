<script setup>
import { RouterLink } from 'vue-router';
import { reactive, ref } from 'vue';
import { EyeIcon, EyeOffIcon, AlertTriangleIcon } from 'lucide-vue-next';

const requested = ref(false);

const passwordFields = reactive({
    showPassword: false,
    showConfirmPassword: false,
});

const formData = reactive({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    mobile: '',
    referral_code: '',
});

const otpVerifyData = reactive({
    otp: '',
});

const fieldErrors = reactive({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    mobile: '',
    otp: '',
});

const error = ref('');
const idForOtpVerify = ref(null);
const checkTnC = ref(false);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^\d{10}$/;

const validateRegister = () => {
    fieldErrors.name = '';
    fieldErrors.email = '';
    fieldErrors.password = '';
    fieldErrors.confirm_password = '';
    fieldErrors.mobile = '';
    error.value = '';

    if (!formData.name.trim()) {
        fieldErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 4) {
        fieldErrors.name = 'Full name must be at least 4 characters.';
    }

    if (!formData.email.trim()) {
        fieldErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
        fieldErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.mobile.trim()) {
        fieldErrors.mobile = 'Mobile number is required.';
    } else if (!mobileRegex.test(formData.mobile.trim())) {
        fieldErrors.mobile = 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.password) {
        fieldErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
        fieldErrors.password = 'Password must be at least 6 characters long.';
    }

    if (!formData.confirm_password) {
        fieldErrors.confirm_password = 'Confirm password is required.';
    } else if (formData.confirm_password !== formData.password) {
        fieldErrors.confirm_password = 'Passwords do not match.';
    }

    if (!checkTnC.value) return false;

    return !Object.values(fieldErrors).some((v) => v);
};

const validateOtp = () => {
    fieldErrors.otp = '';
    error.value = '';

    if (!otpVerifyData.otp.trim()) {
        fieldErrors.otp = 'OTP is required.';
        return false;
    }
    if (otpVerifyData.otp.trim().length < 4) {
        fieldErrors.otp = 'OTP must be at least 4 digits.';
        return false;
    }
    return true;
};

// --- API integration will go here ---
const submitForm = async () => {
    if (!validateRegister()) return;
    // TODO: Call register API
    // Simulate OTP screen for UI testing
    idForOtpVerify.value = 'mock-id';
};

const submitVerifyOtp = async () => {
    if (!validateOtp()) return;
    // TODO: Call OTP verify API
};

const togglePasswordVisibility = (field) => {
    passwordFields[field] = !passwordFields[field];
};
</script>

<template>
    <section class="flex items-start min-h-screen font-geist">
        <!-- Left Panel -->
        <div
            class="hidden overflow-hidden md:block md:w-1/2 bg-[#1A1919] min-h-[50vh] md:h-screen text-center px-4 py-8 md:py-10">
            <div class="flex items-center justify-center">
                <img src="/svg/logo.svg" alt="Logo" class="h-10 md:h-auto" />
            </div>

            <div class="flex items-center flex-col gap-2 mt-6 md:mt-10">
                <h2
                    class="leading-tight text-transparent bg-clip-text text-2xl md:text-[38.2px] max-w-xl font-semibold bg-gradient-to-r from-[#387ED1] to-[#ffffff]">
                    One platform. Multiple brokers. Infinite opportunities
                </h2>
                <p class="text-sm md:text-[18px] text-[#ADB2B9] font-[400] px-4">
                    Seamlessly manage your portfolio and earn smarter every day.
                </p>
            </div>

            <div class="mt-6 md:mt-10">
                <img src="/signup.png" alt="signup" class="max-w-full mx-auto object-contain" />
            </div>
        </div>

        <!-- Right Panel -->
        <div
            class="w-full md:w-1/2 flex flex-col items-center justify-center py-8 md:py-10 px-6 md:px-10 lg:px-20 xl:px-32 min-h-[100vh]">

            <!-- Mobile Logo -->
            <div class="flex md:hidden items-center justify-center py-4">
                <img src="/svg/logo.svg" alt="Logo" />
            </div>

            <h1 class="font-semibold text-2xl md:text-[40px]">Create an account</h1>
            <p class="text-sm text-gray-500 mt-1">Join us today and start your journey</p>

            <!-- Global error -->
            <div v-if="error" class="w-full mt-4 text-red-500 flex items-center justify-center gap-2 text-sm">
                <AlertTriangleIcon class="w-4 h-4 shrink-0" /> {{ error }}
            </div>

            <!-- Registration Form -->
            <template v-if="!idForOtpVerify">
                <form class="w-full mt-6 space-y-4" @submit.prevent="submitForm">

                    <!-- Full Name -->
                    <div class="space-y-1">
                        <label for="name" class="text-sm font-medium">Full Name</label>
                        <input
                            id="name" name="name" v-model.trim="formData.name"
                            type="text" placeholder="e.g. Roshni Chandra"
                            :class="[fieldErrors.name ? 'border-red-500' : 'border-black border-opacity-40', 'w-full border py-2 rounded-md outline-none px-4 bg-transparent text-sm focus:border-[#387ED1] transition-colors']"
                        />
                        <p v-if="fieldErrors.name" class="text-red-500 text-xs mt-1">{{ fieldErrors.name }}</p>
                    </div>

                    <!-- Email -->
                    <div class="space-y-1">
                        <label for="email" class="text-sm font-medium">Email</label>
                        <input
                            id="email" name="email" v-model.trim="formData.email"
                            type="text" placeholder="Enter your email address"
                            :class="[fieldErrors.email ? 'border-red-500' : 'border-black border-opacity-40', 'w-full border py-2 rounded-md outline-none px-4 bg-transparent text-sm focus:border-[#387ED1] transition-colors']"
                        />
                        <p v-if="fieldErrors.email" class="text-red-500 text-xs mt-1">{{ fieldErrors.email }}</p>
                    </div>

                    <!-- Mobile -->
                    <div class="space-y-1">
                        <label for="mobile" class="text-sm font-medium">Mobile Number</label>
                        <input
                            id="mobile" name="mobile" v-model.trim="formData.mobile"
                            type="tel" placeholder="Enter your 10-digit mobile number" maxlength="10"
                            :class="[fieldErrors.mobile ? 'border-red-500' : 'border-black border-opacity-40', 'w-full border py-2 rounded-md outline-none px-4 bg-transparent text-sm focus:border-[#387ED1] transition-colors']"
                        />
                        <p v-if="fieldErrors.mobile" class="text-red-500 text-xs mt-1">{{ fieldErrors.mobile }}</p>
                    </div>

                    <!-- Referral Code (optional) -->
                    <div class="space-y-1">
                        <label for="referral_code" class="text-sm font-medium">
                            Referral Code
                            <span class="text-gray-400 font-normal text-xs ml-1">(Optional)</span>
                        </label>
                        <input
                            id="referral_code" name="referral_code" v-model.trim="formData.referral_code"
                            type="text" placeholder="Enter referral code if you have one"
                            class="w-full border border-black border-opacity-40 py-2 rounded-md outline-none px-4 bg-transparent text-sm focus:border-[#387ED1] transition-colors"
                        />
                    </div>

                    <!-- Password -->
                    <div class="space-y-1">
                        <label for="password" class="text-sm font-medium">Password</label>
                        <div class="relative">
                            <input
                                id="password" name="password" v-model.trim="formData.password"
                                :type="passwordFields.showPassword ? 'text' : 'password'"
                                placeholder="Enter your password"
                                :class="[fieldErrors.password ? 'border-red-500' : 'border-black border-opacity-40', 'w-full border py-2 rounded-md outline-none px-4 pr-10 bg-transparent text-sm focus:border-[#387ED1] transition-colors']"
                            />
                            <span
                                @click="togglePasswordVisibility('showPassword')"
                                class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors">
                                <EyeOffIcon v-if="passwordFields.showPassword" class="w-4 h-4" />
                                <EyeIcon v-else class="w-4 h-4" />
                            </span>
                        </div>
                        <p v-if="fieldErrors.password" class="text-red-500 text-xs mt-1">{{ fieldErrors.password }}</p>

                        <!-- Password strength bar -->
                        <div class="w-full grid grid-cols-12 gap-1 h-1 mt-2" v-if="formData.password">
                            <div class="col-span-4 h-full rounded-full transition-colors duration-300"
                                :class="formData.password.length < 6 ? 'bg-red-400' : formData.password.length < 9 ? 'bg-yellow-400' : 'bg-green-500'">
                            </div>
                            <div class="col-span-4 h-full rounded-full transition-colors duration-300"
                                :class="formData.password.length > 8 ? 'bg-green-500' : formData.password.length > 5 ? 'bg-yellow-400' : 'bg-gray-200'">
                            </div>
                            <div class="col-span-4 h-full rounded-full transition-colors duration-300"
                                :class="formData.password.length >= 9 ? 'bg-green-500' : 'bg-gray-200'">
                            </div>
                        </div>
                        <span
                            v-if="formData.password.length >= 6"
                            :class="formData.password.length < 9 ? 'text-yellow-600' : 'text-green-600'"
                            class="block mt-1 text-xs">
                            {{ formData.password.length < 9 ? 'Average strength — make it longer.' : 'Strong password — well done!' }}
                        </span>
                    </div>

                    <!-- Confirm Password -->
                    <div class="space-y-1">
                        <label for="confirm_password" class="text-sm font-medium">Confirm Password</label>
                        <div class="relative">
                            <input
                                id="confirm_password" name="confirm_password"
                                v-model.trim="formData.confirm_password"
                                :type="passwordFields.showConfirmPassword ? 'text' : 'password'"
                                placeholder="Re-enter your password"
                                :class="[fieldErrors.confirm_password ? 'border-red-500' : 'border-black border-opacity-40', 'w-full border py-2 rounded-md outline-none px-4 pr-10 bg-transparent text-sm focus:border-[#387ED1] transition-colors']"
                            />
                            <span
                                @click="togglePasswordVisibility('showConfirmPassword')"
                                class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors">
                                <EyeOffIcon v-if="passwordFields.showConfirmPassword" class="w-4 h-4" />
                                <EyeIcon v-else class="w-4 h-4" />
                            </span>
                        </div>
                        <p v-if="fieldErrors.confirm_password" class="text-red-500 text-xs mt-1">{{ fieldErrors.confirm_password }}</p>
                    </div>

                    <!-- T&C -->
                    <div class="flex items-start gap-2 text-sm">
                        <input type="checkbox" v-model="checkTnC" id="tnc" class="cursor-pointer mt-0.5 shrink-0" />
                        <label for="tnc" class="cursor-pointer leading-snug text-gray-600">
                            I agree to the Mahadev Capital
                            <a href="/terms-and-conditions" target="_blank" class="text-[#387ED1] hover:underline">T&C</a>
                            and
                            <a href="/privacy-policy" target="_blank" class="text-[#387ED1] hover:underline">Privacy Policy</a>
                        </label>
                    </div>

                    <!-- Submit -->
                    <button
                        :disabled="!checkTnC || requested"
                        type="submit"
                        :class="['w-full py-2.5 rounded-md text-sm font-medium transition-all', checkTnC ? 'bg-[#387ED1] hover:bg-[#2d6dbf] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed']">
                        {{ requested ? 'Sending OTP...' : 'Create Account' }}
                    </button>

                    <p class="text-center text-sm text-gray-500">
                        Already have an account?
                        <RouterLink to="/login" class="text-[#387ED1] font-semibold hover:underline">Login</RouterLink>
                    </p>
                </form>
            </template>

            <!-- OTP Verification -->
            <template v-else>
                <div class="w-full mt-10 text-center">
                    <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 mb-4">
                        <svg class="w-7 h-7 text-[#387ED1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 class="text-xl font-semibold">Verify your email</h2>
                    <p class="text-sm text-gray-500 mt-1">We've sent a 4-digit OTP to <span class="font-medium text-gray-700">{{ formData.email }}</span></p>
                </div>

                <form class="w-full mt-6 space-y-4" @submit.prevent="submitVerifyOtp">
                    <div class="space-y-1">
                        <label for="otp" class="text-sm font-medium">Enter OTP</label>
                        <input
                            id="otp" name="otp" v-model.trim="otpVerifyData.otp"
                            type="text" placeholder="Enter the OTP sent to your email" maxlength="6"
                            :class="[fieldErrors.otp ? 'border-red-500' : 'border-black border-opacity-40', 'w-full border py-2 rounded-md outline-none px-4 bg-transparent text-sm focus:border-[#387ED1] transition-colors tracking-widest text-center text-lg']"
                        />
                        <p v-if="fieldErrors.otp" class="text-red-500 text-xs mt-1">{{ fieldErrors.otp }}</p>
                    </div>

                    <button
                        :disabled="requested" type="submit"
                        class="bg-[#387ED1] hover:bg-[#2d6dbf] w-full text-white py-2.5 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        {{ requested ? 'Verifying...' : 'Verify OTP' }}
                    </button>

                    <p class="text-center text-sm text-gray-500">
                        Didn't receive the OTP?
                        <button type="button" class="text-[#387ED1] font-medium hover:underline">Resend</button>
                    </p>

                    <p class="text-center text-sm text-gray-500">
                        <button type="button" @click="idForOtpVerify = null" class="text-gray-400 hover:text-gray-600 hover:underline text-xs">← Back to registration</button>
                    </p>
                </form>
            </template>
        </div>
    </section>
</template>
