<template>
  <div class="min-h-screen font-sans">
    <div class="max-w-5xl mx-auto">


      <!-- Main Card -->
      <div class="bg-white rounded-3xl border border-primary-border shadow-sm flex overflow-hidden">

        <!-- Left Sidebar -->
        <div class="w-64 shrink-0 border-r border-dashed border-[#CBD5E1] flex flex-col items-center py-10 px-6 gap-4">
          <!-- Avatar -->
          <div class="relative group">
            <div
              class="w-24 h-24 rounded-full bg-card-background flex items-center justify-center shadow-md overflow-hidden">
              <img v-if="profile.profile_picture_url" :src="profile.profile_picture_url" alt="Avatar"
                class="w-full h-full object-cover" />
              <svg v-else class="w-14 h-14 text-secondary-text opacity-90" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <!-- Edit icon overlay -->
            <button type="button" @click="triggerImageUpload"
              class="absolute bottom-0 right-0 w-7 h-7 bg-card-background border border-primary-border rounded-full flex items-center justify-center shadow hover:bg-[#F1F5F9] transition"
              title="Change photo">
              <svg class="w-3.5 h-3.5 text-secondary-text" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-3 1 1-3a4 4 0 01.828-1.414z" />
              </svg>
            </button>
            <input ref="imageInput" type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
          </div>

          <!-- Name & Role -->
          <div class="text-center">
            <p class="text-lg font-bold text-secondary-text">{{ profile.name || 'Rakesh' }}</p>
            <span class="inline-block mt-1 text-xs font-semibold bg-table-header-background text-primary-blue px-3 py-0.5 rounded-md">
              {{ profile.role || 'Admin' }}
            </span>
          </div>

          <!-- Divider -->
          <div class="w-full border-t border-primary-border"></div>

          <!-- Contact Info -->
          <div class="w-full flex flex-col gap-3 text-sm text-secondary-text">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 shrink-0 text-primary-blue" fill="none" stroke="currentColor" stroke-width="1.8"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="truncate">{{ profile.mobile || '91 7777777' }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 shrink-0 text-primary-blue" fill="none" stroke="currentColor" stroke-width="1.8"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="truncate text-xs">{{ profile.email || 'jojij74331@linacit.com' }}</span>
            </div>
          </div>
        </div>

        <!-- Right Content -->
        <div class="flex-1 flex flex-col divide-y divide-[#E2E8F0]">

          <!-- Basic Info Section -->
          <div class="p-8">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h2 class="text-base font-bold text-secondary-text">Basic info</h2>
                <p class="text-xs text-[#94A3B8] mt-0.5">Update your name, email and phone number.</p>
              </div>
              <button v-if="!editingBasic" @click="editingBasic = true"
                class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary-blue text-white text-sm font-semibold hover:bg-[#1D4ED8] transition">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <div v-else class="flex gap-2">
                <button @click="saveBasicInfo" :disabled="savingBasic"
                  class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary-green text-white text-sm font-semibold hover:bg-[#15803D] transition disabled:opacity-60">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ savingBasic ? 'Saving...' : 'Save' }}
                </button>
                <button @click="cancelBasic"
                  class="px-4 py-1.5 rounded-lg border border-primary-border text-sm font-semibold text-secondary-text hover:bg-[#F8FAFC] transition">
                  Cancel
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <!-- Username -->
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-secondary-text tracking-wide uppercase">User Name</label>
                <input v-model="basicForm.name" :disabled="!editingBasic" type="text"
                  class="w-full rounded-xl border border-primary-border bg-[#F8FAFC] px-4 py-2.5 text-sm text-secondary-text placeholder:text-[#CBD5E1] outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="Enter username" />
              </div>

              <!-- Email -->
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-secondary-text tracking-wide uppercase">Email</label>
                <input v-model="basicForm.email" :disabled="!editingBasic" type="email"
                  class="w-full rounded-xl border border-primary-border bg-[#F8FAFC] px-4 py-2.5 text-sm text-secondary-text placeholder:text-[#CBD5E1] outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="Enter email" />
              </div>

              <!-- Phone -->
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-secondary-text tracking-wide uppercase">Number</label>
                <input v-model="basicForm.mobile" :disabled="!editingBasic" type="tel"
                  class="w-full rounded-xl border border-primary-border bg-[#F8FAFC] px-4 py-2.5 text-sm text-secondary-text placeholder:text-[#CBD5E1] outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="Enter phone number" />
              </div>
            </div>
          </div>

          <!-- Change Password Section -->
          <div class="p-8">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h2 class="text-base font-bold text-secondary-text">Change password</h2>
                <p class="text-xs text-[#94A3B8] mt-0.5">Use a strong password you don't use elsewhere.</p>
              </div>
              <button v-if="!editingPassword" @click="editingPassword = true"
                class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary-blue text-white text-sm font-semibold hover:bg-[#1D4ED8] transition">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <div v-else class="flex gap-2">
                <button @click="savePassword" :disabled="savingPassword"
                  class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary-green text-white text-sm font-semibold hover:bg-[#15803D] transition disabled:opacity-60">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ savingPassword ? 'Saving...' : 'Save' }}
                </button>
                <button @click="cancelPassword"
                  class="px-4 py-1.5 rounded-lg border border-primary-border text-sm font-semibold text-secondary-text hover:bg-[#F8FAFC] transition">
                  Cancel
                </button>
              </div>
            </div>

            <!-- Password error alert -->
            <div v-if="passwordError"
              class="mb-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] text-sm">
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              {{ passwordError }}
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <!-- Current Password -->
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-secondary-text tracking-wide uppercase">Current Password</label>
                <div class="relative">
                  <input v-model="passwordForm.current" :disabled="!editingPassword"
                    :type="showCurrent ? 'text' : 'password'"
                    class="w-full rounded-xl border border-primary-border bg-[#F8FAFC] px-4 py-2.5 pr-10 text-sm text-secondary-text outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="••••••••" />
                  <button v-if="editingPassword" type="button" @click="showCurrent = !showCurrent"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-secondary-text transition">
                    <svg v-if="!showCurrent" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- New Password -->
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-secondary-text tracking-wide uppercase">New Password</label>
                <div class="relative">
                  <input v-model="passwordForm.new" :disabled="!editingPassword" :type="showNew ? 'text' : 'password'"
                    class="w-full rounded-xl border border-primary-border bg-[#F8FAFC] px-4 py-2.5 pr-10 text-sm text-secondary-text outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="••••••••" />
                  <button v-if="editingPassword" type="button" @click="showNew = !showNew"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-secondary-text transition">
                    <svg v-if="!showNew" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Confirm Password -->
              <div class="flex flex-col gap-1.5 sm:col-span-1">
                <label class="text-xs font-semibold text-secondary-text tracking-wide uppercase">Confirm New Password</label>
                <div class="relative">
                  <input v-model="passwordForm.confirm" :disabled="!editingPassword"
                    :type="showConfirm ? 'text' : 'password'"
                    class="w-full rounded-xl border border-primary-border bg-[#F8FAFC] px-4 py-2.5 pr-10 text-sm text-secondary-text outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="••••••••" />
                  <button v-if="editingPassword" type="button" @click="showConfirm = !showConfirm"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-secondary-text transition">
                    <svg v-if="!showConfirm" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useProfileStore } from '../../stores/profile'
import { useToastStore } from '../../stores/toast'

const profileStore = useProfileStore()
const toast = useToastStore()
const { profile } = storeToRefs(profileStore)

// Basic Info state
const editingBasic = ref(false)
const savingBasic = ref(false)
const imageInput = ref(null)
const basicForm = ref({
  name: '',
  email: '',
  mobile: '',
})

// Password state
const editingPassword = ref(false)
const savingPassword = ref(false)
const passwordError = ref('')
const showCurrent = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)
const passwordForm = ref({
  current: '',
  new: '',
  confirm: '',
})

// Sync basicForm when profile loads
watch(profile, (val) => {
  basicForm.value = {
    name: val.name || '',
    email: val.email || '',
    mobile: val.mobile || '',
  }
}, { immediate: true })

const triggerImageUpload = () => {
  imageInput.value?.click()
}

// handleImageUpload — fix FormData key
const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const imageFormData = new FormData()
  imageFormData.append('profile_picture_url', file)  // ← was profile_pic_url

  try {
    await profileStore.updateProfile(imageFormData)
    toast.success('Profile picture updated.')
  } catch (error) {
    console.error('Error uploading profile picture:', error)
    toast.error('Failed to update profile picture.')
  } finally {
    event.target.value = ''
  }
}

const cancelBasic = () => {
  basicForm.value = {
    name: profile.value.name || '',
    email: profile.value.email || '',
    mobile: profile.value.mobile || '',
  }
  editingBasic.value = false
}

const saveBasicInfo = async () => {
  savingBasic.value = true
  try {
    await profileStore.updateProfile({
      name: basicForm.value.name,
      email: basicForm.value.email,
      mobile: basicForm.value.mobile,
    })
    editingBasic.value = false
  } catch (e) {
    toast.error('Failed to update profile.')
  } finally {
    savingBasic.value = false
  }
}

const cancelPassword = () => {
  passwordForm.value = { current: '', new: '', confirm: '' }
  passwordError.value = ''
  editingPassword.value = false
}

const savePassword = async () => {
  passwordError.value = ''
  if (!passwordForm.value.current || !passwordForm.value.new || !passwordForm.value.confirm) {
    passwordError.value = 'All password fields are required.'
    return
  }
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    passwordError.value = 'New passwords do not match.'
    return
  }
  if (passwordForm.value.new.length < 6) {
    passwordError.value = 'Password must be at least 6 characters.'
    return
  }
  savingPassword.value = true
  try {
    await profileStore.changePassword({
      old_password: passwordForm.value.current,
      new_password: passwordForm.value.new,
    })
    cancelPassword()
  } catch (e) {
    toast.error('Failed to change password.')
  } finally {
    savingPassword.value = false
  }
}
</script>
