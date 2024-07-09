// src/stores.js
import { writable } from 'svelte/store';

export let chosenSpecie1 = writable(null);
export let chosenSpecie2 = writable(null);
export let leaderboardStore = writable({});
