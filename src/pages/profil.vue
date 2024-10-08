<template>
  <v-row class="d-flex justify-center">
    <v-col cols="12" md="4" sm="12">
      <v-card flat class="pa-4">
        <!-- Avatar Section -->
        <div class="d-flex justify-center mb-4">
          <v-avatar color="surface" size="100">
            <v-img :alt="user.name" :src="`${baseFileUrl()}/${user.image}`" />
          </v-avatar>
        </div>
        <!-- User Information Section -->
        <div class="text-center">
          <div class="text-h6 font-weight-bold">{{ user.name }}</div>
          <div class="font-weight-normal grey--text">{{ user.employe.job.name }}</div>
        </div>

        <!-- Tabs -->
        <v-tabs v-model="tab" class="mt-5" align-tabs="center">
          <v-tab value="0">Data Diri</v-tab>
          <v-tab value="1">Kepegawaian</v-tab>
          <v-tab value="2">Alamat</v-tab>
          <v-tab value="3">Bank</v-tab>
          <v-tab value="4">BPJS</v-tab>
          <v-tab value="5">Salary</v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
          <!-- Data Diri -->
          <v-tabs-window-item value="0">
            <InfoRow label="NIP" :value="user.nik" />
            <InfoRow label="Email" :value="user.email" />
            <InfoRow label="Telepon/HP" :value="user.phone" />
            <InfoRow label="TTL" :value="`${user.placebirth}, ${user.datebirth}`" />
            <InfoRow label="Jenis Kelamin" :value="user.gender === 'm' ? 'Laki-laki' : 'Perempuan'" />
            <InfoRow label="Golongan Darah" :value="user.blood.toUpperCase()" />
            <InfoRow label="Status Pernikahan" :value="user.maritalStatus" />
            <InfoRow label="Agama" :value="user.religion" />
          </v-tabs-window-item>
          <!-- Kepegawaian -->
          <v-tabs-window-item value="1">
            <InfoRow label="Perusahaan" :value="user.employe.company.name" />
            <InfoRow label="Penempatan" :value="user.employe.branch.name" />
            <InfoRow label="Tgl. Bergabung" :value="user.employe.joinDate ?? ''" />
            <InfoRow label="Tgl. Masuk" :value="user.employe.signDate ?? ''" />
            <InfoRow label="Departemen" :value="user.employe.org.name" />
            <InfoRow label="Jabatan" :value="user.employe.job.name" />
            <InfoRow label="Level" :value="user.employe.lvl.name" />
            <InfoRow label="Status" :value="user.employe.status" />
            <InfoRow label="Approval line" :value="user.employe.appline.name" />
            <InfoRow label="Approval manager" :value="user.employe.appmngr.name" />
          </v-tabs-window-item>
          <!-- Alamat -->
          <v-tabs-window-item value="2">
            <InfoRow label="Alamat KTP" :value="user.address.citizenIdAddress" />
            <InfoRow label="Alamat Tinggal" :value="user.address.residentialAddress" />
            <InfoRow label="Kode POS" :value="user.address.postalcode" />
          </v-tabs-window-item>
          <!-- Bank -->
          <v-tabs-window-item value="3">
            <InfoRow label="Nama Bank" :value="user.bank.bankName.toUpperCase()" />
            <InfoRow label="No. Rekening" :value="user.bank.bankAccount" />
            <InfoRow label="Atas Nama" :value="user.bank.bankAccountHolder" />
          </v-tabs-window-item>
          <!-- Bpjs -->
          <v-tabs-window-item value="4">
            <InfoRow label="Terdaftar BPJS kesahatan ?" :value="user.bpjs.bpjsKesehatan ? 'Ya' : 'Tidak'" />
            <InfoRow label="Biaya BPJS kesahatan ?" :value="user.bpjs.bpjsKesehatanCost" />
            <InfoRow label="Tgl BPJS kesahatan ?" :value="user.bpjs.bpjsKesehatanDate" />
            <InfoRow label="Keluarga BPJS kesahatan ?" :value="user.bpjs.bpjsKesehatanFamily ? 'Ya' : 'Tidak'" />
            <InfoRow label="Terdaftar BPJS ketenagakerjaan ?" :value="user.bpjs.bpjsKetenagakerjaan ? 'Ya' : 'Tidak'" />
            <InfoRow label="NPP BPJS ketenagakerjaan ?" :value="user.bpjs.nppBpjsKetenagakerjaan" />
            <InfoRow label="Tgl BPJS ketenagakerjaan ?" :value="user.bpjs.bpjsKetenagakerjaanDate" />
            <InfoRow label="Biaya jaminan pensiun ?" :value="user.bpjs.jaminanPensiunCost" />
            <InfoRow label="Tgl pembayaran jaminan pensiun ?" :value="user.bpjs.jaminanPensiunDate" />
            <InfoRow label="Biaya JHT" :value="user.bpjs.jhtCost" />
          </v-tabs-window-item>
          <!-- Salary -->
          <v-tabs-window-item value="5">
            <InfoRow label="Gaji pokok" :value="`${user.salary.basicSalary}`" />
            <InfoRow label="Mata uang" :value="user.salary.currency" />
            <InfoRow label="Aturan lembur" :value="user.salary.overtimeSettings" />
            <InfoRow label="Jadwal pembayaran" :value="user.salary.paymentSchedule" />
            <InfoRow label="Aturan prorate" :value="user.salary.prorateSettings" />
            <InfoRow label="Tipe pembayaran" :value="user.salary.salaryType" />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card>
    </v-col>
    <v-col cols="12" md="8" sm="12">
      <v-card flat>
        <v-card-title>
          <v-tabs v-model="tabform" align-tabs="center">
            <v-tab value="1">Data diri</v-tab>
            <v-tab value="2">Alamat</v-tab>
            <v-tab value="3">BANK</v-tab>
            <v-tab value="4">Kontak darurat</v-tab>
            <v-tab value="5">Keluarga</v-tab>
            <v-tab value="6">Pendidikan Formal</v-tab>
            <v-tab value="7">Pendidikan Informal</v-tab>
            <v-tab value="8">Pengalaman Kerja</v-tab>
          </v-tabs>
        </v-card-title>
        <v-card-text>
          <v-tabs-window v-model="tabform">
            <!-- Data Diri -->
            <v-tabs-window-item value="1">
              <FormDatadiri />
            </v-tabs-window-item>
            <!-- Data Alamat -->
            <v-tabs-window-item value="2">
              <FormAlamat />
            </v-tabs-window-item>
            <!-- data bank -->
            <v-tabs-window-item value="3">
              <FormBank />
            </v-tabs-window-item>
            <!-- data kontak darurat -->
            <v-tabs-window-item value="4">
              <FormKontakDarurat />
            </v-tabs-window-item>
            <!-- data family -->
            <v-tabs-window-item value="5">
              <FormFamily />
            </v-tabs-window-item>
            <!-- pendidikan formal -->
            <v-tabs-window-item value="6">
              <FormFormal />
            </v-tabs-window-item>
            <!-- pendidikan informal -->
            <v-tabs-window-item value="7">
              <FormInformal />
            </v-tabs-window-item>
            <!-- pengalaman kerja -->
            <v-tabs-window-item value="8">
              <FormPengalamanKerja />
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import globalMixin from '@/mixins/globalMixin';
import { ref, computed, defineComponent, h } from 'vue';
import { useAuthStore } from '@/stores/apps/auth';
import FormDatadiri from '@/components/form/FormDatadiri.vue';
import FormAlamat from '@/components/form/FormAlamat.vue';
import FormBank from '@/components/form/FormBank.vue';
import FormFamily from '@/components/form/FormFamily.vue';
import FormKontakDarurat from '@/components/form/FormKontak.vue';
import FormFormal from '@/components/form/FormFormal.vue';
import FormInformal from '@/components/form/FormInformal.vue';
import FormPengalamanKerja from '@/components/form/FormPengalamanKerja.vue';

const { baseFileUrl } = globalMixin.methods;

// State Management
const store = useAuthStore();
const user = computed(() => store.user);

// Reactive State for Tab
const tab = ref(1);
const tabform = ref(null);

// Component for Info Row
const InfoRow = defineComponent({
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // Define render function instead of template
    return () =>
      h('div', { class: 'd-flex justify-space-between my-2' }, [
        h('div', { class: 'font-weight-normal' }, props.label),
        h('div', { class: 'font-weight-normal text-subtitle-2' }, props.value)
      ]);
  }
});
</script>

<style scoped>
.mt-15 {
  margin-top: .9375rem;
}
</style>
