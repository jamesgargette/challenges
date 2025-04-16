<script setup>
import { ref } from "vue";
import { useBookStore } from "@/stores/books.js";
import Loader from "@/components/Loader.vue";
import { useRoute } from "vue-router";
import BookCover from "@/components/BookCover.vue";

const book = ref(null);
const store = useBookStore();
const route = useRoute();

fetchBook();

async function fetchBook() {
  book.value = await store.fetchBook(route.params.id);
}
</script>

<template>
  <div class="book">
    <Loader v-if="!book" />
    <section v-else>
      <BookCover :book="book" class="book-cover" />
      <div>
        <h1 class="text">
          {{ book.title }}
        </h1>
        <h2 class="text">
          <em>
            {{ book.author }}
          </em>
        </h2>
        <div class="text">User rating: {{ book.rating }} / 5</div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.text {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem 0 0rem 0;
  text-align: left;
  padding-left: 0.5rem;
  color: aliceblue;
}

section {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.book-cover {
  flex: 0 1 300px;
}
</style>
