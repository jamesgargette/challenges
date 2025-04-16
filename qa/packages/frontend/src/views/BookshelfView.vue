<script setup>
import { ref, watch } from "vue";
import { useBookStore } from "@/stores/books.js";
import Loader from "@/components/Loader.vue";
import BookCover from "@/components/BookCover.vue";
import Pagination from "@/components/Pagination.vue";
import Sort from "@/components/Sort.vue";
import Search from "@/components/Search.vue";

const PAGE_SIZE = 12;

const books = ref(null);
const pageNumber = ref(1);
const store = useBookStore();
const sort = ref("id");
const search = ref("");

watch(pageNumber, fetchBooks, { immediate: true });
watch(sort, fetchBooks);
watch(search, fetchBooks);

async function fetchBooks() {
  const offset = pageNumber.value * PAGE_SIZE;
  const limit = PAGE_SIZE;
  books.value = await store.fetchBooks({
    offset,
    limit,
    sort: sort.value,
    search: search.value,
  });
}
</script>

<template>
  <div class="bookshelf">
    <Loader v-if="!books" />
    <div v-else>
      <div class="top">
        <Search v-model="search" />
        <Sort v-model="sort" />
      </div>
      <h1 class="heading">Bookshelf</h1>
      <section>
        <div v-for="book in books" :key="book.id" class="book-wrapper">
          <BookCover :book="book" />
          <div class="book-title">{{ book.title }}</div>
        </div>
      </section>

      <Pagination v-model="pageNumber" />
    </div>
  </div>
</template>

<style scoped>
.book-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.book-title {
  margin-top: 0.5rem;
  text-align: center;
  font-weight: 600;
  color: white;
  font-size: 1rem;
}

.heading {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem 0 0rem 0;
  text-align: left;
  padding-left: 0.5rem;
  color: aliceblue;
}

.top {
  display: flex;
  justify-content: space-between;
}

section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  row-gap: 1rem;
  grid-column-gap: 1rem;
  justify-items: center;
  padding: 2rem 0;
}
</style>
