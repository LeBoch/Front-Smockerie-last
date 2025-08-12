<template>
  <div class="flex min-h-full flex-1">
    <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">

      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img class="h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company" />
          <h2 class="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p class="mt-2 text-sm/6 text-gray-500">
            Not a member?
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
          </p>
        </div>

        <form @submit.prevent="login" class="mt-10 space-y-6">
          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div class="mt-2">
              <input v-model="email" id="email" autocomplete="email" required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm/6 font-medium text-gray-900">
              Password
            </label>

            <div class="mt-2">
              <input v-model="password" type="password" id="password" autocomplete="current-password" required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>

          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <input v-model="rememberMe" id="remember-me" type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <label for="remember-me" class="text-sm/6 text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm/6">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>

          <div>
            <button type="submit" :disabled="loading"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-2 focus:outline-indigo-600 disabled:opacity-50">
              <span v-if="!loading">Sign in</span>
              <span v-else>Signing in…</span>
            </button>
          </div>

          <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
        </form>

        <!-- section “Or continue with”… -->
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img class="absolute inset-0 size-full object-cover"
        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?auto=format&fit=crop&w=1908&q=80" alt="" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// 1. Crée une instance Axios avec ta base URL (à extraire idéalement en variable d'env)
const API_BASE = 'http://localhost:5275'
const api = axios.create({
  baseURL: `${API_BASE}/api/Auth`,
  headers: { 'Content-Type': 'application/json' },
})

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const error = ref<string | null>(null)
const router = useRouter()

async function login() {
  loading.value = true
  error.value = null

  try {
    // 2. Appel POST avec Axios
    const response = await api.post('/login', {
      username: email.value,
      password: password.value
    })

    // 3. Récupère token et expiration
    const { token, expiresIn } = response.data

    // 4. Stocke le JWT
    localStorage.setItem('jwt_token', token)
    if (rememberMe.value) {
      const expiry = Date.now() + expiresIn * 1000
      localStorage.setItem('jwt_expiry', expiry.toString())
    }

    console.log('Login successful:', response.data)
    // 5. Redirection
    await router.push({ name: 'Admin' })
  }
  catch (err: any) {
    // 6. Gestion fine des erreurs Axios
    if (err.response) {
      // Erreur renvoyée par le serveur (ex. 401)
      error.value = err.response.data?.message || `Erreur ${err.response.status}`
    } else if (err.request) {
      // Pas de réponse reçue
      error.value = 'Pas de réponse du serveur, vérifiez votre connexion.'
    } else {
      // Erreur côté client
      error.value = err.message
    }
  }
  finally {
    loading.value = false
  }
}
</script>
