import { defineStore } from 'pinia'
import { DateTime } from 'luxon'
import Swal from 'sweetalert2'
import api from '@/plugins/axios'

const formatDate = (date = new Date()) => {
  const dateTime = typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromJSDate(date)
  if (!dateTime.isValid) {
    return null
  }
  return dateTime.toFormat('yyyy-MM-dd')
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {},
    role: null,
    permission: null,
    token: localStorage.getItem('token') || null,
    form: {
      user: {
        name: '', nik: '', email: '', password: '', phone: '',
        placebirth: '', datebirth: formatDate(), gender: '', blood: '',
        maritalStatus: '', religion: '', image: []
      },
      address: {
        idtype: 'ktp', idnumber: '', idexpired: formatDate(), ispermanent: false,
        postalcode: '', citizenIdAddress: '', useAsResidential: false, residentialAddress: ''
      },
      bank: { bankName: '', bankAccount: '', bankAccountHolder: '' },
      emergency_contacts: [{ name: '', relationship: '', phone: '', profession: '' }],
      family: [{ fullname: '', relationship: '', birthdate: '', marital_status: '', job: '' }],
      formal_education: [{ institution: '', majors: '', score: '', start: formatDate(), finish: formatDate(), description: '', certification: true }],
      informal_education: [{ name: '', start: formatDate(), finish: formatDate(), expired: formatDate(), type: '', duration: '', fee: '', description: '', certification: true }],
      work_experience: [{ company: '', position: '', from: formatDate(), to: formatDate(), length_of_service: '' }],
    },
    loadingProfile: false,
    errors: [],
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    addItemToArray(arr, defaultItem) {
      this.form[arr].push(defaultItem);
    },
    delItemFromArray(arr, index) {
      this.form[arr].splice(index, 1);
    },
    addEC() { this.addItemToArray('emergency_contacts', { name: '', relation: '', phone: '', profession: '' }); },
    delEC(index) { this.delItemFromArray('emergency_contacts', index); },
    addFamily() { this.addItemToArray('family', { fullname: '', relationship: '', birthdate: '', marital_status: '', job: '' }); },
    delFamily(index) { this.delItemFromArray('family', index); },
    addFE() { this.addItemToArray('formal_education', { institution: '', majors: '', score: '', start: '', finish: '', description: '', certification: true }); },
    delFE(index) { this.delItemFromArray('formal_education', index); },
    addIFE() { this.addItemToArray('informal_education', { name: '', start: '', finish: '', expired: '', type: '', duration: '', fee: '', description: '', certification: true }); },
    delIFE(index) { this.delItemFromArray('informal_education', index); },
    addWE() { this.addItemToArray('work_experience', { company: '', position: '', from: formatDate(), to: formatDate(), length_of_service: '' }); },
    delWE(index) { this.delItemFromArray('work_experience', index); },
    async login(userData) {
      try {
        const response = await api.post('/login', userData);
        const { token, abilities } = response.data;

        this.token = token;
        localStorage.setItem('token', token);
        this.permission = abilities
        await this.profile()
      } catch (error) {
        this.showAlert(error.status, error.message)
      }
    },
    async logout() {
      try {
        await api.get('/logout');
        this.removeCredential();
        window.location.reload()
      } catch (error) {
        this.showAlert(error.status, error.message)
      }
    },
    async profile() {
      try {
        const response = await api.get('/user-auth');
        const { account, role, permission } = response.data;
        this.user = account
        await this.assignPermissionAndRole(permission, role)
        await this.assignFormData(account)
      } catch (error) {
        console.error(error);
        if (error.status === 401) {
          this.showAlert(error.status, error.message)
          this.removeCredential();
          window.location.reload()
        }
      }
    },
    async assignPermissionAndRole(newPermissions, newRole) {
      if (this.permission !== null) {
        const combinedPermissions = new Set([...this.permission, ...newPermissions]);
        this.permission = Array.from(combinedPermissions);
      }
      this.permission = [...newPermissions];
      if (this.role !== null) {
        const combinedRoles = new Set([...this.role, ...newRole]);
        this.role = Array.from(combinedRoles);
      }
      this.role = [...newRole];
    },
    async submitProfile(form) {
      this.loadingProfile = true
      try {
        const res = await api.put(`/user-update/${this.user.id}`, form);
        this.showAlert(res.status, 'Data berhasil diperbaharui')
      } catch (error) {
        this.errors = error.response.data
        this.showAlert(error.status, error.message)
        this.removeCredential()
      } finally {
        this.loadingProfile = false
      }
    },
    removeCredential() {
      this.token = null;
      this.permission = null;
      this.role = null;
      this.user = {};
      localStorage.removeItem('token');
    },
    showAlert(status, msg) {
      Swal.fire({
        title: status === 200 ? "Success" : "Error!",
        text: msg,
        icon: status === 200 ? "success" : "error",
        confirmButtonText: "Tutup",
        customClass: {
          confirmButton: 'sweet-confirm-button-class',
        }
      });
    },
    async assignFormData(account) {
      const {
        name,
        nik,
        email,
        phone,
        placebirth,
        datebirth,
        gender,
        blood,
        maritalStatus,
        religion,
        address = {},
        bank = {},
        emergencyContact,
        family,
        formalEducation = [],
        informalEducation = [],
        workExperience,
      } = account;
      Object.assign(this.form.user, {
        name,
        nik,
        email,
        phone,
        placebirth,
        datebirth,
        gender,
        blood,
        maritalStatus,
        religion,
      });
      if (address) {
        this.form.address = {
          idtype: address.idtype ?? 'ktp',
          idnumber: address.idnumber ?? '',
          idexpired: address.idexpired ?? formatDate(),
          ispermanent: address.ispermanent ?? false,
          postalcode: address.postalcode ?? '',
          citizenIdAddress: address.citizenIdAddress ?? '',
          useAsResidential: address.useAsResidential ?? false,
          residentialAddress: address.residentialAddress ?? ''
        };
      }
      if (bank) {
        this.form.bank = {
          bankName: bank.bankName || '',
          bankAccount: bank.bankAccount || '',
          bankAccountHolder: bank.bankAccountHolder || ''
        };
      }
      this.form.emergency_contacts = emergencyContact || [];
      this.form.family = family || [];
      this.form.formal_education = formalEducation.map(el => ({
        institution: el.institution,
        majors: el.majors,
        score: el.score,
        start: el.start,
        finish: el.finish,
        description: el.description,
        certification: !!el.certification,
      }));
      this.form.informal_education = informalEducation.map(el => ({
        name: el.name,
        start: el.start,
        finish: el.finish,
        expired: el.expired,
        type: el.type,
        duration: el.duration,
        fee: el.fee,
        description: el.description,
        certification: !!el.certification,
      }));
      this.form.work_experience = workExperience.map(el => ({
        company: el.company,
        position: el.position,
        from: el.from,
        to: el.to,
        length_of_service: el.lengthOfService
      }))
    }
  },
});
