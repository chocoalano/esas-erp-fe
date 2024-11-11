<script setup>
import { ref, computed } from 'vue';
import { useUsersStore } from '@/stores/apps/master-data/users'
import * as XLSX from 'xlsx';

const store = useUsersStore()
const actLoading = computed(() => store.actLoading)
// Reactive properties
const dialog = ref(false);
const sourceExcels = ref(null);
const jsonData = ref({});
const selectedTab = ref(0);

// Computed property to check if any sheet contains incomplete data
const isSaveDisabled = computed(() => {
    // return Object.values(jsonData.value).some(sheetData => 
    //     sheetData.some(row => 
    //         Object.values(row).some(cell => cell === null || cell === undefined || cell === '')
    //     )
    // );
    return false
});

const extractFromExcel = () => {
    if (!sourceExcels.value) {
        alert("Please select an Excel file first.");
        return;
    }

    const file = sourceExcels.value;
    const reader = new FileReader();

    reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        // Clear previous data and reset jsonData
        jsonData.value = {};
        workbook.SheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            if (rows.length < 2) {
                console.warn(`Sheet "${sheetName}" does not contain enough data.`);
                return;
            }
            const keys = rows[0];
            const sheetData = rows.slice(1)
                .filter(row => row.some(cell => cell !== null && cell !== undefined))
                .map(row => keys.reduce((acc, key, index) => {
                    acc[key] = row[index] !== undefined ? row[index] : null;
                    return acc;
                }, {}));
            jsonData.value[sheetName] = sheetData;
        });
        selectedTab.value = 0;
    };
    reader.readAsArrayBuffer(file);
};

const handleImport = ()=>{
    store.postImport(jsonData.value)
    dialog.value = false
}
</script>

<template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn prepend-icon="mdi-export" text="Import" v-bind="activatorProps" variant="tonal" />
            </template>
            <v-card>
                <v-toolbar>
                    <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
                    <v-toolbar-title>Manage Data</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <!-- Disable Save button if any data cell is empty -->
                        <v-btn text="Save" variant="text" @click="handleImport" :disabled="isSaveDisabled" :loading="actLoading">
                            Save
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-file-input label="Pilih file .xlsx untuk diextract" v-model="sourceExcels" show-size
                        append-inner-icon="mdi-submit" @change="extractFromExcel" />
                </v-card-text>

                <v-card-text>
                    <v-tabs v-model="selectedTab">
                        <v-tab v-for="(data, sheetName, index) in jsonData" :key="index" :value="index">
                            {{ sheetName }}
                        </v-tab>
                    </v-tabs>
                    <v-tabs-window v-model="selectedTab">
                        <v-tabs-window-item v-for="(data, sheetName, index) in jsonData" :key="index" :value="index">
                            <div v-if="data.length > 0">
                                <v-table>
                                    <thead>
                                        <tr>
                                            <th v-for="(key, keyIndex) in Object.keys(data[0])" :key="keyIndex">
                                                {{ key }}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
                                            <td v-for="(value, colKey) in row" :key="colKey"
                                                :class="value ? 'bg-background' : 'bg-error'">
                                                {{ value }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </div>
                            <p v-else>No data available in this sheet.</p>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
