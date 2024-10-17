<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/apps/auth';
import imgLogo from '@/assets/logo_esas.svg'

const initialState = {
  nik: '',
  password: '',
};

const visible = ref(false);
const isMail = ref(false);

const state = reactive({
  ...initialState,
});

const router = useRouter()
const store = useAuthStore()

const loading = ref(false)
const error = ref(null)

const SubmitEvent = async () => {
  loading.value = true;
  error.value = null;

  try {
    await store.login({ nik: state.nik, password: state.password })
    router.push({ path: 'dashboard' })
  } catch (err) {
    error.value = 'Login failed. Please check your credentials and try again.'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
};
</script>
<template>
  <form @submit.prevent="SubmitEvent">
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4">
        <div>
          <v-img :width="117" aspect-ratio="16/9" cover :src="imgLogo" class="mb-5 mx-auto"></v-img>

          <p class="text-body-2 mb-4">
            Lakukan semua kegiatan administrasi anda bersama <strong>esas</strong>
          </p>
        </div>
      </v-sheet>
      <v-divider :thickness="3" class="mb-6"></v-divider>
      <!-- Display error message if login fails -->
      <div v-if="error" class="text-error mb-4">{{ error }}</div>

      <v-text-field density="compact" :placeholder="isMail ? 'Email' : 'NIK'"
        :prepend-inner-icon="isMail ? 'mdi-google-plus' : 'mdi-account-child-outline'" variant="outlined"
        v-model="state.nik" required :append-inner-icon="isMail ? 'mdi-email' : 'mdi-account'"
        :type="isMail ? 'email' : 'number'" @click:append-inner="isMail = !isMail"></v-text-field>

      <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
        density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
        @click:append-inner="visible = !visible" v-model="state.password" required></v-text-field>

      <v-card class="mb-12" color="primary" variant="tonal">
        <v-card-text class="text-medium-emphasis text-caption">
          Informasi, Jika kamu lupa password akun, kamu bisa menghubungi Tim HR untuk meminta reset password.
        </v-card-text>
      </v-card>

      <v-btn class="mb-8" color="primary" size="large" variant="elevated" block type="submit" :loading="loading"
        :disabled="loading">
        Log In
      </v-btn>
    </v-card>
  </form>
</template>
