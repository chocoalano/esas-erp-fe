import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/apps/master-data/users'

export function useUsersTables() {
  const store = useUsersStore()
  const { desserts, totalItems, loading } = storeToRefs(store)
  const itemsPerPage = ref(10)
  const search = ref('')
  const page = ref(1)

  watch([search, page], () => {
    store.fetchDesserts({
      page: page.value,
      itemsPerPage: itemsPerPage.value,
      sortBy: [],
      search: search.value,
    })
  })

  function fetchItems({ page, itemsPerPage, sortBy }) {
    store.fetchDesserts({ page, itemsPerPage, sortBy, search: search.value })
  }

  return {
    itemsPerPage,
    page,
    search,
    fetchItems,
    headers: [
      { title: 'NIK', key: 'nik', align: 'end' },
      { title: 'NAMA', key: 'name', align: 'start' },
      { title: 'TELEPON/HP', key: 'phone', align: 'end' },
      { title: 'STATUS', key: 'employe.status', align: 'start' },
      { title: 'GENDER', key: 'gender', align: 'start' },
      { title: 'TEMPAT LAHIR', key: 'placebirth', align: 'start' },
      { title: 'ACTIONS', key: 'actions', sortable: false },
    ],
    serverItems: desserts,
    totalItems,
    loading,
  }
}
