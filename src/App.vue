<template>
  <v-app>
    <v-main>
      <v-app-bar app>
        <!-- <v-app-bar-nav-icon> -->
          <!-- <v-icon>mdi-menu</v-icon> -->
           <div class="logo-container">
            <img src="https://firebasestorage.googleapis.com/v0/b/vic-test-frbs.firebasestorage.app/o/extended.png?alt=media&token=9b4fe901-0586-439b-9ea4-a1d1a7a0bea7" alt="Logo" class="logo" />
          </div>
           
        <!-- </v-app-bar-nav-icon> -->
        <v-app-bar-title>Workout Routine Builder</v-app-bar-title>
        <v-spacer></v-spacer>
        <div v-if="user">
          <p>Welcome, {{ user.displayName }}</p>
          <v-btn variant="tonal" color="primary" @click="signOut">Sign Out</v-btn>
        </div>
        <div v-else>
          <v-btn variant="tonal" color="primary" @click="signInWithGoogle">Sign in with Google</v-btn>
        </div>
      </v-app-bar>

      <v-container>
        <v-row>
          <v-col cols="12" class="text-center">
            <h1>Search for Exercises</h1>
            <v-text-field
              v-model="exerciseName"
              label="Enter exercise name"
              outlined
              dense
            ></v-text-field>
            <v-btn color="primary" @click="fetchExer(exerciseName)">Search</v-btn>
          </v-col>
        </v-row>
  <v-row>        
  <v-col
    v-for="(exercise, idx) in exerciseData"
    :key="idx"
    cols="12"
    sm="6"
    md="4"
  >
    <v-card>
      <v-card-title>{{ exercise.name }}</v-card-title>
      <v-card-subtitle>
        <span v-if="exercise.type">Type: {{ exercise.type }}</span>
        <span v-if="exercise.muscle"> | Muscle: {{ exercise.muscle }}</span>
      </v-card-subtitle>
      <v-card-text>
        <div v-if="exercise.equipment"><strong>Equipment:</strong> {{ exercise.equipment }}</div>
        <div v-if="exercise.instructions"><strong>Instructions:</strong> {{ exercise.instructions }}</div>
      </v-card-text>
    </v-card>
  </v-col>
</v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.logo-container {
  height: 100%;
  display: flex;
  align-items: center;
}
.logo {
  height: 100%;
  max-height: 56px; /* Default app bar height for desktop */
  width: auto;
}
</style>


<script setup>
import { ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth'
import { provider } from './firebase'

import { db } from './firebase';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";



const auth = useFirebaseAuth()
const user = ref(null) // Reactive reference to hold the user object
const exerciseData = ref([]) // Reactive reference to hold exercise data, array for multiple results

// Listen for authentication state changes
onAuthStateChanged(auth, async (u) => {
  user.value = u

//firestore logic to add user if not exists
  if (u) {
    try {
      // Check if user already exists
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", u.uid));
      const querySnapshot = await getDocs(q); 

      if (querySnapshot.empty) {
        // Only add if user does not exist
        await addDoc(usersRef, {
          name: u.displayName,
          email: u.email,
          uid: u.uid
        });
        console.log("User added to Firestore!");
      } else {
        console.log("User already exists in Firestore.");
      }
    } catch (e) {
      console.error("Error adding user to Firestore: ", e);
    }
  }

})

// Function to sign in with Google
const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider)
  } catch (error) {
    console.error('Login failed', error)
  }
}
// Function to sign out
const signOut = async () => {
  try {
    await firebaseSignOut(auth)
  } catch (error) {
    console.error('Sign out failed', error)
  }
}

//Function to call the Firebase function to fetch exercise data from API ninjas
const fetchExer = async (exerciseName) => {
  try {
    const response = await fetch(
      `https://fetchexer-2lhmrlxnba-uc.a.run.app?name=${encodeURIComponent(exerciseName)}`
    );
    const data = await response.json();
// This will log the fetched data to the browser console   
//    console.log('Data fetched:', data);
    exerciseData.value = Array.isArray(data) ? data : [data]; // Ensure it's always an array
  } catch (error) {
    console.error('Error fetching exercise:', error);
    exerciseData.value = []; // Reset to empty array on error
  }
};
 
</script>


