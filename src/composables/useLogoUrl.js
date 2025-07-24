// composables/useLogoUrl.js
import { ref as storageRef, getDownloadURL } from 'firebase/storage'
import { ref } from 'vue'
import { storage } from '@/firebase' // adjust to your actual path

export function useLogoUrl(path = 'logos/my-logo.png') {
  const url = ref(null)


  const loadImage = async () => {
    const imageRef = storageRef(storage, path)
    url.value = await getDownloadURL(imageRef)
  }

  loadImage()

  return {
    url
  }
}
