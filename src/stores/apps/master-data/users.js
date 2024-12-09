import { defineStore } from 'pinia';
import api from '@/plugins/axios';
import { DateTime } from 'luxon';
import Swal from 'sweetalert2'

const formatDate = (date = new Date()) => {
  const dateTime = typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
  if (!dateTime.isValid) {
    return null;
  }
  return dateTime.toFormat('yyyy-MM-dd');
};

export const useUsersStore = defineStore('users', {
  state: () => ({
    desserts: [],
    totalItems: 0,
    loading: false,
    actLoading: false,
    errors: {},
    success: null,
    avatar: '',
    form: {
      user: {
        name: '', role: [], nik: '', email: '', password: '', phone: '',
        placebirth: '', datebirth: null, gender: '', blood: '',
        maritalStatus: '', religion: '', image: []
      },
      address: {
        idtype: 'ktp', idnumber: '', idexpired: null, ispermanent: false,
        postalcode: '', citizenIdAddress: '', useAsResidential: false, residentialAddress: ''
      },
      bank: { bankName: '', bankAccount: '', bankAccountHolder: '' },
      bpjs: {
        bpjsKetenagakerjaan: false, nppBpjsKetenagakerjaan: '',
        bpjsKetenagakerjaanDate: null, bpjsKesehatan: false,
        bpjsKesehatanFamily: false, bpjsKesehatanDate: null,
        bpjsKesehatanCost: 0, jhtCost: null, jaminanPensiunCost: 0,
        jaminanPensiunDate: null
      },
      employe: {
        companyId: '', branchId: '', status: '', joinDate: null, signDate: null,
        organizationId: '', jobPositionId: '', jobLevelId: '',
        approvalLine: '', approvalManager: ''
      },
      salary: { basicSalary: '', salaryType: '', paymentSchedule: '', prorateSettings: '', overtimeSettings: '', costCenter: '', costCenterCategory: '', currency: 'Rupiah' },
      tax: { npwp15DigitOld: '', npwp16DigitNew: '', ptkpStatus: '', taxMethod: 'gross', taxSalary: 'taxable', empTaxStatus: '', beginningNetto: 0, pph21_paid: 0 },

      emergency_contacts: [{ name: '', relationship: '', phone: '', profession: '' }],
      family: [{ fullname: '', relationship: '', birthdate: '', marital_status: '', job: '' }],
      formal_education: [{ institution: '', majors: '', score: '', start: null, finish: null, description: '', certification: false }],
      informal_education: [{ name: '', start: null, finish: null, expired: null, type: '', duration: '', fee: '', description: '', certification: false }],
      work_experience: [{ company: '', position: '', from: null, to: null, length_of_service: '' }],
    },
    roleOptions: [],
    company: [], branch: [], departemen: [], jabatan: [], level: [], approval: [],
    status: [
      { id: 'contract', name: 'Kontrak' },
      { id: 'permanent', name: 'Permanen' },
      { id: 'magang', name: 'Magang' },
      { id: 'last daily', name: 'Harian lepas' }
    ]
  }),

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
    addFE() { this.addItemToArray('formal_education', { institution: '', majors: '', score: '', start: '', finish: '', description: '', certification: '' }); },
    delFE(index) { this.delItemFromArray('formal_education', index); },
    addIFE() { this.addItemToArray('informal_education', { name: '', start: '', finish: '', expired: '', type: '', duration: '', fee: '', description: '', certification: '' }); },
    delIFE(index) { this.delItemFromArray('informal_education', index); },
    addWE() { this.addItemToArray('work_experience', { company: '', position: '', from: '', to: '', length_of_service: '' }); },
    delWE(index) { this.delItemFromArray('work_experience', index); },

    async fetchDesserts({ page, itemsPerPage, search }) {
      this.loading = true;
      try {
        const { data } = await api.get(`/web/users`, { params: { page, limit: itemsPerPage, search } });
        this.desserts = data.data;
        this.totalItems = data.meta.total;
      } finally {
        this.loading = false;
      }
    },

    async kelengkapan_form_user() {
      this.loading = true;
      try {
        const response = await api.get(`/web/users-kelengkapan-form`);
        const { role, company, branch, departemen, jabatan, level, approval } = response.data;
        Object.assign(this, { roleOptions: role, company, branch, departemen, jabatan, level, approval });
      } catch (error) {
        console.error('Failed to fetch user form data:', error);
      } finally {
        this.loading = false;
      }
    },

    async show({ id }) {
      this.loading = true;
      try {
        const { data } = await api.get(`/web/users/${id}/edit`);
        this.assignFormData(data);
      } catch (error) {
        console.error('Failed to fetch user form data:', error);
      } finally {
        this.loading = false;
      }
    },

    async delete(id) {
      this.loading = true;
      try {
        const { data } = await api.delete(`/web/users/${id}`);
      } catch (error) {
        console.error('Failed to delete user form data:', error);
      } finally {
        this.loading = false;
      }
    },

    async postImport(dataimport) {
      this.actLoading = true;
      try {
        const { data } = await api.post('/web/users/import', dataimport)
        Swal.fire({
          title: "Berhasil!",
          text: "Data berhasil disimpan",
          icon: "success",
          confirmButtonText: "Tutup",
          customClass: {
            confirmButton: 'sweet-confirm-button-class',
          }
        });
      } catch (error) {
        console.error(error)
        Swal.fire({
          title: "Error!",
          text: `Error, data gagal disimpan: ${error.response.data}, perhatikan file import anda! kami tidak menerima data import yang masih belum lengkap!`,
          icon: "error",
          confirmButtonText: "Tutup",
          customClass: {
            confirmButton: 'sweet-confirm-button-class',
          }
        });
      } finally {
        this.actLoading = false;
      }
    },

    async handleSubmit(action, id = null) {
      this.actLoading = true;

      try {
        const formData = this.createFormData();
        const apiUrl = action === 'create' ? '/web/users' : `/web/users/${id}`;
        const apiMethod = action === 'create' ? 'post' : 'put';
        const response = await api[apiMethod](apiUrl, formData);
        const isSuccess = response.status === 200;

        Swal.fire({
          title: isSuccess ? "Berhasil!" : "Gagal!",
          text: isSuccess ? "Data berhasil disimpan" : response.data,
          icon: isSuccess ? "success" : "error",
          confirmButtonText: "Tutup",
          customClass: {
            confirmButton: 'sweet-confirm-button-class',
          }
        });

      } catch (error) {
        this.errors = error.response?.data || "Unknown error";
        Swal.fire({
          title: "Error!",
          text: `Error, data gagal disimpan: ${error}`,
          icon: "error",
          confirmButtonText: "Tutup",
          customClass: {
            confirmButton: 'sweet-confirm-button-class',
          }
        });

      } finally {
        this.actLoading = false;
      }
    },

    createFormData() {
      const formData = new FormData();

      // Helper function to append form data
      const appendData = (data, keyPrefix = '') => {
        if (Array.isArray(data)) {
          data.forEach((item, index) => {
            Object.keys(item).forEach(key => {
              const value = item[key];
              if (value !== undefined && value !== null) {
                const formKey = `${keyPrefix}[${index}][${key}]`;
                if (value instanceof Date) {
                  if (!isNaN(value.getTime())) {
                    formData.append(formKey, value.toISOString().split('T')[0])
                  } else {
                    formData.append(formKey, new Date().toISOString().split('T')[0])
                  }
                } else {
                  formData.append(formKey, value);
                }
              }
            });
          });
        } else {
          Object.keys(data).forEach(key => {
            const value = data[key];
            const formKey = keyPrefix ? `${keyPrefix}[${key}]` : key;
            if (value !== undefined && value !== null) {
              if (value instanceof Date) {
                if (!isNaN(value.getTime())) {
                  formData.append(formKey, value.toISOString().split('T')[0])
                } else {
                  formData.append(formKey, new Date().toISOString().split('T')[0])
                }
              } else {
                formData.append(formKey, value);
              }
            }
          });
        }
      };

      // Append different parts of the form data
      appendData(this.form.user, 'user');
      appendData(this.form.address, 'address');
      appendData(this.form.bank, 'bank');
      appendData(this.form.bpjs, 'bpjs');
      appendData(this.form.employe, 'employe');
      appendData(this.form.salary, 'salary');
      appendData(this.form.tax, 'tax');
      appendData(this.form.emergency_contacts, 'emergency_contacts');
      appendData(this.form.family, 'family');
      appendData(this.form.formal_education, 'formal_education');
      appendData(this.form.informal_education, 'informal_education');
      appendData(this.form.work_experience, 'work_experience');

      return formData;
    },

    assignFormData(data) {
      const {
        name, nik, email, phone, placebirth, datebirth, gender, blood, maritalStatus, religion, roles, image,
        address, bank, bpjs, emergencyContact, family, formalEducation, informalEducation, workExperience, employe, salary, taxConfig
      } = data;
      let arrRole = []
      roles.forEach(e => {
        arrRole.push(e.id)
      });
      this.avatar = image
      this.form.user = { name, nik, email, phone, placebirth, datebirth: new Date(datebirth), gender, blood, maritalStatus, religion, role: arrRole };
      this.form.address = {
        idtype: address?.idtype ?? 'ktp',
        idnumber: address?.idnumber ?? '',
        idexpired: new Date(address?.idexpired) ?? new Date(),
        ispermanent: address?.ispermanent ?? false,
        postalcode: address?.postalcode ?? '',
        citizenIdAddress: address?.citizenIdAddress ?? '',
        useAsResidential: address?.useAsResidential ?? false,
        residentialAddress: address?.residentialAddress ?? ''
      };
      this.form.bank = { bankName: bank?.bankName ?? '', bankAccount: bank?.bankAccount ?? '', bankAccountHolder: bank?.bankAccountHolder ?? '' };
      this.form.bpjs = {
        bpjsKetenagakerjaan: bpjs?.bpjsKetenagakerjaan ?? '',
        nppBpjsKetenagakerjaan: bpjs?.nppBpjsKetenagakerjaan ?? '',
        bpjsKetenagakerjaanDate: new Date(bpjs?.bpjsKetenagakerjaanDate) ?? new Date(),
        bpjsKesehatan: bpjs?.bpjsKesehatan ?? false,
        bpjsKesehatanFamily: bpjs?.bpjsKesehatanFamily ?? false,
        bpjsKesehatanDate: new Date(bpjs?.bpjsKesehatanDate) ?? new Date(),
        bpjsKesehatanCost: bpjs?.bpjsKesehatanCost ?? 0,
        jhtCost: new Date(bpjs?.jhtCost) ?? new Date(),
        jaminanPensiunCost: bpjs?.jaminanPensiunCost ?? 0,
        jaminanPensiunDate: new Date(bpjs?.jaminanPensiunDate) ?? new Date()
      };
      this.form.salary = {
        basicSalary: salary?.basicSalary,
        salaryType: salary?.salaryType,
        paymentSchedule: salary?.paymentSchedule,
        prorateSettings: salary?.prorateSettings,
        overtimeSettings: salary?.overtimeSettings,
        costCenter: salary?.costCenter,
        costCenterCategory: salary?.costCenterCategory,
        currency: salary?.currency,
      };
      this.form.employe = {
        companyId: employe?.companyId ?? '',
        branchId: employe?.branchId ?? '',
        status: employe?.status ?? '',
        joinDate: new Date(employe?.joinDate) ?? new Date(),
        signDate: new Date(employe?.signDate) ?? new Date(),
        organizationId: employe?.organizationId ?? '',
        jobPositionId: employe?.jobPositionId ?? '',
        jobLevelId: employe?.jobLevelId ?? '',
        approvalLine: employe?.approvalLine ?? '',
        approvalManager: employe?.approvalManager ?? ''
      };
      this.form.tax = {
        npwp15DigitOld: taxConfig?.npwp15DigitOld ?? '',
        npwp16DigitNew: taxConfig?.npwp16DigitNew ?? '',
        ptkpStatus: taxConfig?.ptkpStatus ?? '',
        taxMethod: taxConfig?.taxMethod ?? 'gross',
        taxSalary: taxConfig?.taxSalary ?? 'taxable',
        empTaxStatus: taxConfig?.empTaxStatus ?? '',
        beginningNetto: taxConfig?.beginningNetto ?? 0,
        pph21_paid: taxConfig?.pph21_paid ?? 0
      };

      this.form.emergency_contacts = emergencyContact;
      this.form.family = family;
      this.form.formal_education = formalEducation;
      const ife = []
      for (const item in informalEducation) {
        ife.push({
          name: item, name,
          start: new Date(item.start) ?? new Date(),
          finish: new Date(item.finish) ?? new Date(),
          expired: new Date(item.expired) ?? new Date(),
          type: item.type ?? '',
          duration: item.duration ?? '',
          fee: item.fee ?? '',
          description: item.description ?? '',
          certification: item.certification > 0 ? true : false
        })
      }
      this.form.informal_education = ife;
      this.form.work_experience = workExperience;
    }
  }
});
